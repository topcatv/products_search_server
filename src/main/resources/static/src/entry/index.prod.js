import '../common/lib';
import 'babel-polyfill';
// react
import React from 'react';
import { render } from 'react-dom';
// router
import { hashHistory } from 'react-router';
// redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
// import createLogger from 'redux-logger';
// const loggerMiddleware = createLogger();

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// reducers
import * as reducers from '../reducers';

// top entry
import AppContainer from '../container/AppContainer'

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
  enhancer,
  autoRehydrate()
);

persistStore(store)

const history = syncHistoryWithStore(hashHistory, store);

render(
  <div>
    <AppContainer store={store} history={history} />
  </div>
  , document.getElementById('react-content')
);
