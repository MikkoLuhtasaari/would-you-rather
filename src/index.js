import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import {createStore} from "redux"
import reducer from "./reducers/index.js"
import middleware from "./middleware"
import App from './components/App';
import './index.css'
import 'typeface-roboto'

const store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root'));
