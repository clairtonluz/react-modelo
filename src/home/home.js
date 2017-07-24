import React, {Component} from 'react';
import logo from '../images/logo.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.toast = this.toast.bind(this);
    }

    toast() {
        var $toastContent = $('<div><span class="fa fa-sign-in"></span>I am toast content</div>');
        Materialize.toast($toastContent, 4000);
    }

    render() {
        return (
            <div className="center">
                <img className="responsive-img" src={logo} alt="logo"/>
                <h2>Welcome to React</h2>
                <button className="btn" onClick={this.toast}>Toast!</button>
            </div>
        );
    }
}

export default Home;
