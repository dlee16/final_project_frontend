import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from './Reducer';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { ActionCableProvider } from 'react-actioncable-provider'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 

store.dispatch({type:"ADD_GROUPLIST"})

ReactDOM.render(
    <BrowserRouter>
        <ActionCableProvider url={"ws://localhost:3000/socket"}>
            <Provider store={store}>
                < App />
            </Provider>
        </ActionCableProvider>
    </BrowserRouter>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
