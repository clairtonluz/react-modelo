import React, {Component} from "react";
import background from "../images/sidebar-background.jpg";
import Toast from "../helpers/toast";
import firebase from "firebase";
import BlockUi from "react-block-ui";
import {withRouter} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            remember: false,
            blocking: false,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    attemptLogin(event) {
        event.preventDefault();
        const that = this;
        const persistence = this.state.remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
        that.setState({blocking: true});
        firebase.auth()
            .setPersistence(persistence)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(that.state.email, that.state.password);
            })
            .then(() => {
                that.setState({blocking: false});
                withRouter(({history}) => (
                    history.push('/')
                ));
            })
            .catch(function (error) {
                that.setState({blocking: false});
                console.log(error);
                Toast.show(error.message);
            });
    }

    render() {
        return (
            <BlockUi tag="div" blocking={this.state.blocking}>
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <form onSubmit={this.handleSubmit}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={background} height='200px'/>
                                    <span className="card-title">
                                    <h2>Login</h2>
                                    <h6>Bytecom</h6>
                                </span>
                                </div>
                                <div className="card-content">
                                    <div className="input-field">
                                        <i className="fa fa-user-circle prefix"/>
                                        <input name="email" id="email" type="email"
                                               value={this.state.email}
                                               onChange={this.handleInputChange}/>
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="row">
                                        <div className="col s12 m8 l9">
                                            <div className="input-field">
                                                <i className="fa fa-keyboard-o prefix"/>
                                                <input name="password" id="password" type="password"
                                                       value={this.state.password}
                                                       onChange={this.handleInputChange}/>
                                                <label className="active" htmlFor="password">Senha</label>
                                            </div>
                                        </div>
                                        <div className="col s12 m4 l3">
                                            <div className="input-field">
                                                <input type="checkbox" name="remember" id="remember-me"
                                                       checked={this.state.remember}
                                                       onChange={this.handleInputChange}/>
                                                <label htmlFor="remember-me">Lembrar</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action blue-grey lighten-3">
                                    <div className="center-align">
                                        <button type="submit" className="btn" onClick={this.attemptLogin}>
                                            <i className="fa fa-sign-in left"></i>Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row">
                            <div className="col s4">
                                <a href="#">Registrar</a>
                            </div>
                            <div className="col s8 right-align">
                                <a href="#" className="">Esqueci a senha</a>
                            </div>
                        </div>
                    </div>
                </div>
            </BlockUi>
        );
    }
}

export default Login;
