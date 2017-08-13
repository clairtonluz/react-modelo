import React, {Component} from 'react';
import MenuItem from './menu-item';

class Submenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let icon = this.props.icon ? <i className={this.props.icon}></i> : '';
        // let identifier = this.props.name.toLowerCase().split(' ').join('-');

        return (
            <li>
                <a className="collapsible-header">
                    {icon}
                    {this.props.name}
                    <i className="material-icons right">arrow_drop_down</i>
                </a>
                <div className="collapsible-body">
                    <ul>
                        {this.props.menuList}
                    </ul>
                </div>
            </li>
        );
    }
}

export default Submenu;
