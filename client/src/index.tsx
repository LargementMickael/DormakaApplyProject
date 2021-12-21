import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from "redux"
import { Store } from '@reduxjs/toolkit';
import { Provider } from "react-redux"

import restaurantsReducer from './reducers/restaurantsReducer'
const store: Store<RestaurantState, RestaurantAction> = createStore(restaurantsReducer);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />            
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
