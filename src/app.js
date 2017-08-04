import React, {Component} from 'react';
import MenuDrawer from './menu/menu-drawer'
import config from 'config';
import firebase from "firebase";

class App extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(config.firebase);
        this.state = {user: {}};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('user:', user);
                user.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("  Provider-specific UID: " + profile.uid);
                    console.log("  Name: " + profile.displayName);
                    console.log("  Email: " + profile.email);
                    console.log("  Photo URL: " + profile.photoURL);
                });

                let displayName = "Clairton Luz";
                let photoURL = "https://avatars1.githubusercontent.com/u/4212741?v=4&s=460";
                let that = this;
                user.updateProfile({
                    displayName: displayName,
                    photoURL: photoURL
                }).then(function () {
                    let user = firebase.auth().currentUser;
                    that.setState({user: user});
                }).catch(function (error) {
                    console.log('error', error);
                    // An error happened.
                });


            } else {
                console.log('user singed out');
                this.context.router.push('/#/login');
                // User is signed out.
                // ...
            }
            this.setState({user: user});
        });
    }

    render() {
        return (
            <div>
                <MenuDrawer user={this.state.user}/>
            </div>
        );
    }
}

export default App;
