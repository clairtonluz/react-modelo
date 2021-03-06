import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import Home from "../home/home";
import Logout from "../login/logout";
import NotFound from "./not-found";
import firebase from "firebase";

const AuthRoute = ({component: Component, rest}) => (
    <Route {...rest} render={props => (
        firebase.auth().currentUser ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

class MyRoutes extends Component {
    render() {
        return (
            <div className="container">
                <Switch>
                    <AuthRoute path="/" exact component={Home}/>
                    <AuthRoute path="/logout" component={Logout}/>
                    <AuthRoute path="/clientes" component={NotFound}/>
                    <AuthRoute path="/planos" component={NotFound}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default MyRoutes;