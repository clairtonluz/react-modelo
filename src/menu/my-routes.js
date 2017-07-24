import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import Home from '../home/home';
import Login from '../login/login';
import NotFound from './not-found';

class MyRoutes extends Component {
    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/clientes" component={NotFound}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default MyRoutes;