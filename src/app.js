import React, {Component} from "react";
import MenuDrawer from "./menu/menu-drawer";
import MyRoutes from "./menu/my-routes";
import firebase from "firebase";
import './loading.css';
import {HashRouter} from 'react-router-dom'
import Login from "./login/login";
import registerServiceWorker from './service-worker/service-worker'
import pushNotification from './service-worker/push-notification';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: undefined};
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
        console.log('user', this.state.user);
        if (this.state.user === undefined) {
            view =
                <div className="center" style={{paddingTop: '10em'}}>
                    loading...
                </div>
        } else if (this.state.user) {
            // pushNotification.requestPermission();
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
