import React, {Component} from 'react';
import background from '../images/sidebar-background.jpg';
import LoginResource from './login-resource';
import Toast from "../helpers/toast";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
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

    required(inputs) {
        let invalids = []
        for (let key in inputs) {
            let value = inputs[key];
            if (!value || !value.trim().length) {
                invalids.push(key);
            }
        }
        return invalids;
    }

    attemptLogin(event) {
        event.preventDefault();
        var inputs = $( "form" ).find('input');
        inputs.each((input)=>{

            console.log(input);
            console.log(input.isValid());
        });
        // let invalids = this.required({
        //     username: this.state.username,
        //     password: this.state.password
        // })
        // if (invalids.length) {
        //     Toast.info("Campo(s) obrigatorio(s): " + JSON.stringify(invalids));
        // } else {
        //     console.log(invalids);
        //     new LoginResource().login(this.state.username, this.state.password)
        //         .then((data) => {
        //             console.log('resul');
        //             console.log(data);
        //         });
        //
        // }
    }

    render() {
        return (
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
                                    <input className="validate" name="username" id="username"
                                           type="text" required
                                           value={this.state.username}
                                           onChange={this.handleInputChange}/>
                                    <label htmlFor="username" data-error="wrong" data-success="right">Usuário</label>
                                </div>

                                <div className="row">
                                    <div className="col s12 m8 l9">
                                        <div className="input-field">
                                            <i className="fa fa-keyboard-o prefix"/>
                                            <input name="password" id="password"
                                                   type="password"
                                                   required
                                                   value={this.state.password}
                                                   onChange={this.handleInputChange}/>
                                            <label htmlFor="password">Senha</label>
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
        );
    }
}

export default Login;
