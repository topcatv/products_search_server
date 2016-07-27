/**/import '../common/lib';
import 'babel-polyfill';

// react
import React from 'react';
import { render } from 'react-dom';
// router
import { Router, browserHistory } from 'react-router';
// redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// reducers
import * as reducers from '../reducers';

// top entry
import App from '../component/App';

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  enhancer
);

const history = syncHistoryWithStore(browserHistory, store);

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    {
      path: '*',
      component: App
    }
  ]
};

render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
    </div>
  </Provider>
  , document.getElementById('react-content')
);
