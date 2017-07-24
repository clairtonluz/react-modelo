import React, {Component} from 'react';

import logo from '../images/logo.png';
import logoNegativa from '../images/logo-negative.png';
import sidebarBackground from '../images/sidebar-background.jpg';
import menuData from './menu.json';

import MenuItem from './menu-item';
import Submenu from './submenu';

import MyRoutes from "./my-routes";

class MenuDrawer extends Component {

    constructor(props) {
        super(props);
        this.createMenu = this.createMenu.bind(this);
    }

    componentDidMount() {
        $(".button-collapse").sideNav({closeOnClick: false});
    }

    render() {
        let menuList = this.createMenuList(menuData);

        return (
            <div>
                <ul id="slide-out" className="side-nav">
                    <li>
                        <div className="user-view">
                            <div className="background center">
                                <img src={sidebarBackground}/>
                            </div>
                            <img className="circle white" src={logo} width="20px"/>
                            <span className="white-text name">Bytecom Informática</span>
                            <span className="white-text email">sac@bytecominformatica.com.br</span>
                        </div>
                    </li>
                    <li>
                        <a href="/#login">
                            Login
                        </a>
                    </li>
                    {menuList}
                </ul>

                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">
                            <img src={logoNegativa} width='55px'/>
                        </a>
                        <a href="#" data-activates="slide-out" className="button-collapse show-on-medium-and-up">
                            <i className="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
                <MyRoutes/>
            </div>
        );
    }

    createMenuList(menuList, parentKey) {
        return menuList.map((menu, index) => {
            let key = parentKey ? parentKey + '-' + index : index;
            if (menu.itens) {
                return this.createSubmenu(key, menu);
            } else {
                return this.createMenu(key, menu);
            }
        });
    }

    createMenu(key, menu) {
        return <MenuItem key={key} activeOnlyWhenExact={menu.activeOnlyWhenExact} name={menu.name} href={menu.url}
                         icon={menu.icon} target={menu.target} isSubitem={!Number.isInteger(key)}/>;
    }

    createSubmenu(key, submenu) {
        let menuList = this.createMenuList(submenu.itens, key);
        return <Submenu key={key} name={submenu.name} menuList={menuList} icon={submenu.icon}/>;
    }

}

export default MenuDrawer;
