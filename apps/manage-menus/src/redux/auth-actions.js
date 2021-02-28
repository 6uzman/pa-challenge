//Tipos de acciones
export const AUTHENTICATE = 'AUTHENTICATE'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const LOGOUT = 'LOGOUT'


//creadores de acciones
export function autenticar(access, refresh) {
    return {
        type: AUTHENTICATE,
        payload: {
            access: access,
            refresh: refresh
        }
    }
}

export function actualizarToken(access, refresh) {
    //console.log("Se actualizó el token")
    return {
        type: REFRESH_TOKEN,
        payload: {
            access: access,
            refresh: refresh
        }
    }
}


export function cerrarSesion() {
    return {
        type: LOGOUT,
        payload: {}
    }
}
