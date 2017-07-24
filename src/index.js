import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'

import './style.css';
import App from "./app";

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>,
    document.getElementById('root')
);