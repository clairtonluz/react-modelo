import React, {Component} from 'react';
import MenuItem from './menu-item';

class Submenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let icon = this.props.icon ? <i className={this.props.icon}></i> : '';
        let identifier = this.props.name.toLowerCase().split(' ').join('-');

        return (
            <ul>
                <li>
                    <a className="dropdown-button" data-activates={identifier}>
                        {icon}
                        {this.props.name}
                        <i className="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
                <ul id={identifier} className='dropdown-content'>
                    {this.props.menuList}
                </ul>
            </ul>
        );
    }
}

export default Submenu;
