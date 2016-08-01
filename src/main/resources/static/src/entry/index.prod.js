import '../common/lib';
import 'babel-polyfill';
// react
import React from 'react';
import { render } from 'react-dom';
// router
import { Router, Route, hashHistory } from 'react-router';
// redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
// const loggerMiddleware = createLogger();

import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// reducers
import * as reducers from '../reducers';

// top entry
import App from '../component/App';
import Main from '../container/Main';
import Index from '../component/Index';

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware
  )
);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  enhancer
);

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Index} />
        <Route path="/admin" component={App}>
          <Route path="index" component={Main} />
        </Route>
      </Router>
    </div>
  </Provider>
  , document.getElementById('react-content')
);
