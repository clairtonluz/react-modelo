import React, {Component} from 'react';
import {
    Route,
    Link
} from 'react-router-dom'

class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.closeMenu = this.closeMenu.bind(this);
    }

    closeMenu() {
        $('.button-collapse').sideNav('hide');
    }

    render() {
        let icon = this.props.icon ? <i className={this.props.icon}></i> : '';
        let target = this.props.target ? this.props.target : '_self';

        if (this.props.href.startsWith('http')) {
            return (
                <li><a href={this.props.href} onClick={this.closeMenu} target={target}>
                    {icon}{this.props.name}
                </a></li>
            );
        } else {
            return (
                <Route path={this.props.href} exact={this.props.activeOnlyWhenExact} children={({match}) => (
                    <li className={(match ? 'active' : '') + (this.props.isSubitem ? ' submenu-item' : '')}>
                        <Link to={this.props.href} onClick={this.closeMenu} target={target}>
                            {icon}
                            {this.props.name}
                        </Link>
                    </li>
                )}/>
            );
        }
    }
}

export default MenuItem;
