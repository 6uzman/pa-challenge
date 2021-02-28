import React from "react"
import { Route, Redirect } from "react-router-dom"
import PropTypes from 'prop-types'

const PrivateRoute = ({component: Componente, auth, ...rest }) => {
    //console.log("Se valida privateRoute - auth:",auth)
    return <>
        <Route {...rest} 
                render = { props => auth.isAuthenticated === true ? 
                        <Componente {...props} />  : 
                        <Redirect to="/login" /> 
                    } />
    </>
}

PrivateRoute.propTypes = {
    path: PropTypes.string,
    auth: PropTypes.object,
    component: PropTypes.any
}

export default PrivateRoute