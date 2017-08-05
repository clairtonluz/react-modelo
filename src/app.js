import React, {Component} from "react";
import MenuDrawer from "./menu/menu-drawer";
import MyRoutes from "./menu/my-routes";
import firebase from "firebase";
import './loading.css';
import {withRouter} from 'react-router-dom'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}};
        // console.log(APP_CONFIG.firebase);
        firebase.initializeApp(APP_CONFIG.firebase);
    }

    componentDidMount() {
        const that = this;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                that.setState({user: user});
                // let displayName = "Clairton Luz";
                // let photoURL = "https://avatars1.githubusercontent.com/u/4212741?v=4&s=460";
                // let that = this;
                // user.updateProfile({
                //     displayName: displayName,
                //     photoURL: photoURL
                // }).then(function () {
                //     let user = firebase.auth().currentUser;
                //     that.setState({user: user});
                // }).catch(function (error) {
                //     console.log('error', error);
                //     // An error happened.
                // });
            } else {
                console.log('user singed out');
                withRouter(({history}) => (
                    history.push('/login')
                ));
            }
            this.setState({user: user});
        });
    }

    render() {
        return (
            <div>
                <MenuDrawer user={this.state.user}/>
                <MyRoutes/>
            </div>
        );
    }
}

export default App;
