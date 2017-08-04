import React, {Component} from "react";
import Toast from "../helpers/toast";
import firebase from "firebase";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout();
    }

    logout() {
        firebase.auth().signOut().catch(function (error) {
            Toast.show(error.message);
        });
    }

    render() {
        return (
            <div className="row">
                <h3>Saindo...</h3>
            </div>
        );
    }
}

export default Logout;
