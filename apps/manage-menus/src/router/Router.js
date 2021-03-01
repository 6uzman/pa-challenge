import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import store from "../redux/store"
import Login from '../components/login/Login'
import PrivateRoute from "./PrivateRoute"
import MenuEdition from "../components/menu-edition/MenuEdition"



function Router() {

    let auth = {
        isAuthenticated: false
    }

    store.subscribe(() => {
        let aux = store.getState()
        if (aux.authenticate) {
            auth.isAuthenticated = aux.authenticate.isAuthenticated
        } else {
            auth.isAuthenticated = false
        }
    })

    return <>
        <BrowserRouter >
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <PrivateRoute exact path="/home" auth={auth} component={MenuEdition} />

                {/* <PrivateRoute exact path="/home" auth={auth} component={NavBar} /> */}
            </Switch>
        </BrowserRouter>
    </>
}

export default Router