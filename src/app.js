import React, {Component} from "react";
import MenuDrawer from "./menu/menu-drawer";
import MyRoutes from "./menu/my-routes";
import firebase from "firebase";
import './loading.css';
import {HashRouter} from 'react-router-dom'
import Login from "./login/login";
import registerServiceWorker from './registerServiceWorker'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null};
        firebase.initializeApp(APP_CONFIG.firebase);
    }

    componentDidMount() {
        registerServiceWorker();
        const that = this;
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user: user});
        });
    }

    render() {
        let view;
        if (this.state.user) {
            view = (
                <HashRouter>
                    <div>
                        <MenuDrawer user={this.state.user}/>
                        <MyRoutes/>
                    </div>
                </HashRouter>
            );
        } else {
            view = <Login/>;
        }

        return view;
    }
}

export default App;
