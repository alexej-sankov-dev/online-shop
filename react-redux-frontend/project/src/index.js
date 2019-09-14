import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk';
import throttle from 'lodash/throttle'

import App from './components/App';
import reducers from './reducers';
import { loadState, saveState } from './actions/localStorage'

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(throttle(() => {
    saveState({
        cart : store.getState().cart,
        auth: store.getState().auth,
        payment: store.getState().payment
    });
}, 1000));

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.querySelector('#root'));

