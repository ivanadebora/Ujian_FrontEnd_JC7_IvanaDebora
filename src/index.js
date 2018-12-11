import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './supports/css/style.css'
import './supports/css/agency.css';
import './supports/fontawesome-free/css/fontawesome.min.css'; 
import './supports/fontawesome-free/css/all.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers,{}, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
