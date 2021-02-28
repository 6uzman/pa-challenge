import React, { useState } from "react"
import PropTypes from "prop-types"

function LoginCard(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setError] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [showError, setShowError] = useState(false)

    const handleSendForm = async (event) => {
        //console.log("username:",username, " - password: ", password)
        setError("")

        // not empty
        if(username && password && username.length > 0 && password.length > 0 ) {
            setShowError(false)
            setIsLoading(true)
            const respo = await props.credentialValidation(username, password)
            setIsLoading(false)
            if(respo && respo.errors && respo.errors.length > 0){
                setError(respo.errors[0].message)
            } else {
                // send to another route
                props.history(props.nextRoute)
            }
        } else {
            setShowError(true)
        }   
    }
   

    return <>
       <div className="container">
            <div className="row">
                <div className="col">
                        <div className="my-3">
                            <label className="form-label ">Usuario</label>
                            <input className={"form-control " + (showError && username.length <= 0 ?  "is-invalid" : "") }
                                    id="form-input-user"  
                                    type="text" 
                                    aria-label="input user" 
                                    onChange={ event => setUsername(event.target.value)}/>
                            {
                                showError && username.length <= 0 && 
                                    <small id="userHelp" className="form-text text-muted">Este campo no puede ser vacío</small>
                            }
                        </div>
                        <div className="my-3">
                            <label className="form-label">Contraseña</label>
                            <input className={"form-control " +  (showError && password.length <= 0 ?  "is-invalid" : "") }
                                    id="form-input-pwd"  
                                    type="password" 
                                    aria-label="input password" 
                                    onChange={ event => setPassword(event.target.value)}/>
                            {
                                showError && password.length <= 0 && 
                                    <small id="passwordHelp" className="form-text text-muted">Este campo no puede ser vacío</small>
                                    
                            }                                       
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <div className="d-grid gap-2">
                                    <button type="button" 
                                            disabled={isLoading}
                                            className="btn btn-primary btn-block"
                                            onClick={handleSendForm}>
                                        <strong className="mx-4">Ingresar</strong>
                                        {
                                            isLoading &&
                                            <div className="text-rigth spinner-border spinner-border-sm" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        }
                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            {
                errorMessage && errorMessage.length > 0 &&
                    <div className="row">
                        <div className="col">
                                <p className={"text-danger"}>{errorMessage}</p>
                        </div>
                    </div>
            }
        </div> 
    </>
}


LoginCard.propTypes = {
    credentialValidation: PropTypes.func,
    history: PropTypes.func,
    nextRoute: PropTypes.string
}

export default LoginCard




