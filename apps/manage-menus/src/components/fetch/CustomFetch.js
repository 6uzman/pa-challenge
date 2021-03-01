import store from "../../redux/store"
import { actualizarToken, cerrarSesion } from '../../redux/auth-actions'


async function request(url, params, method = 'GET') {
    //build the token header
    const { authenticate } = store.getState()
    console.log(authenticate)
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + authenticate.access
        }
    }

    if (params) {
        if (method === 'GET') {
            url += '?' + objectToQueryString(params)
        } else {
            options.body = JSON.stringify(params)
        }
    }

    try {
        console.log(process.env.NX_BASE_URL)
        const response = await fetch(process.env.NX_BASE_URL + url, options)
        console.log("response:", response)

        var jsonResponse = undefined

        switch (response.status) {
            case 200, 201, 202:
                try {
                    jsonResponse = await response.json()
                    //console.log(jsonResponse)
                } catch (err) { // its ok, but no body request
                    jsonResponse = { status: "ok" }
                }
                break
            case 400:
                try {
                    jsonResponse = await response.json()
                } catch (err) {
                    jsonResponse = { status: "error", message: "Ocurrió un problema, por favor intente nuevamente más tarde." }
                }
                break
            case 401:
                try {
                    jsonResponse = await response.json()
                    jsonResponse.status = "retry"
                } catch (err) {
                    jsonResponse = { status: "retry" }
                }
                break
            default:
                try {
                    jsonResponse = await response.json()
                } catch (err) {
                    jsonResponse = { status: "error", message: "No se puede procesar la solicitud en este momento" }
                }
        }
        return jsonResponse
    } catch (err) {
        return {
            status: "error",
            message: "Servicio no disponible"
        }
    }
}



function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
}


function get(url, params) {
    return retryCall(url, params)
}


function update(url, params) {
    return retryCall(url, params, 'PUT')
}


async function retryCall(url, params, operation) {
    const response = await request(url, params, operation)
    if (response.status === 'retry') {
        await refreshToken()
        return await request(url, params, operation)
    }
    return response
}


async function refreshToken() {
    const { authenticate } = store.getState()

    const params = {
        refresh: authenticate.refresh
    }
    try {
        const response = await request("/token/refresh", params, 'POST')
        if (response.status === 200) {
            let jsonRes = await response.json()
            //update access & refresh token to redux
            store.dispatch(actualizarToken(jsonRes.access, jsonRes.refresh))

        } else {
            store.dispatch(cerrarSesion())
        }

    } catch (e) {
        console.error("Ocurrio un error", e)
        store.dispatch(cerrarSesion())
    }
}


export default {
    get,
    update
}