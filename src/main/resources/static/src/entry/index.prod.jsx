/**/import '../common/lib';
import 'babel-polyfill';

// react
import React from 'react';
import { render } from 'react-dom';
// router
import { Router, hashHistory, browserHistory } from 'react-router';
// redux
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
const loggerMiddleware = createLogger();

import { Provider } from 'react-redux';
import { syncHistory } from 'react-router-redux';
// reducers
import reducer from '../reducers';

// top entry
import App from '../component/App';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const store = createStore(
  reducer,
  enhancer
);
// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

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
      <Router history={hashHistory} routes={routes} />
    </div>
  </Provider>
  , document.getElementById('react-content')
);
