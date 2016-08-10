import '../common/lib';
import 'babel-polyfill';

// redux-devtools
import { createDevTools, persistState } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// react
import React from 'react';
import { render } from 'react-dom';
// router
import { Router, Route, hashHistory } from 'react-router';
// redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
// import createLogger from 'redux-logger';
// const loggerMiddleware = createLogger();

import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// reducers
import * as reducers from '../reducers';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" changeMonitorKey="ctrl-m">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);
// top entry
import App from '../component/App';
import Index from '../component/Index';
import {Main, ShopCart} from '../container';

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
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

persistStore(store);

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={Index} />
        <Route path="/admin" component={App}>
          <Route path="index" component={Main} />
          <Route path="shopCart" component={ShopCart} />
        </Route>
      </Router>
      { !window.devToolsExtension ? <DevTools /> : null }
    </div>
  </Provider>
  , document.getElementById('react-content')
);
