import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css"
import { connect } from "react-redux"

import { LoginCard } from "@parrot-challenge/ui"
import parrotLogo from "../../assets/EMBLEMA_PARROT-05.png"
import { autenticar } from '../../redux/auth-actions'


const JSON_HEADER = 'application/json'
const DEFAULT_RESPONSE = { errors: [
           { "message": "Ocurrió un error, intente más tarde." }
       ]}

class Login extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        //validate if have a previous token 
    }

    credentialValidation = async (user, pass) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': JSON_HEADER
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        }
        let jsonResponse = undefined
        let response = undefined

        try{
            response = await fetch("http://api-staging.parrot.rest/api/auth" + '/token', options)
            console.log(response)
            jsonResponse = await response.json()
        }catch(error) {
            jsonResponse = DEFAULT_RESPONSE
        }
        
        if (jsonResponse && !jsonResponse.errors) {
            this.props.autenticar(jsonResponse.access, jsonResponse.refresh)
            this.props.history.push("/home")

            //set token & refresh to store
            //redirect to home
        } 
        return jsonResponse 
    }
      
    history = () => {
        console.log("Save tokens")
    }
    
    render() {
        return <>
        <div className="container" >
            <div className="row justify-content-center align-items-center fila">
                <div className="col col-sm-10 col-md-6">
                    <div className="card" >
                        <img src={parrotLogo} className="card-img-top" alt="logo" />
                        <div className="card-body">
                            <h4 className="card-title text-center">¡Bienvenido!</h4>
                            <LoginCard credentialValidation={this.credentialValidation} history={this.history} nextRoute="/home" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    }
}



const mapStateToProps = (state) => {
    return {
        authenticate: state.authenticate
    }
}

const mapDispatchToProps = (dispatchEvent) => {
    return {
        autenticar: (access, refresh) => dispatchEvent(autenticar(access, refresh))
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Login))