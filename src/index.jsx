import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, BrowserRouter,
} from 'react-router-dom';

// redux saga
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './bootstrap.js';
import rootSaga from './redux/sagas/root_saga';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './scss/common.scss';
import './index.scss';
import allReducers from './redux/reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

store.dispatch({
  type: '@@__INIT__',
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
