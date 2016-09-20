import React from 'react'
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';

import App from '../component/App'
import Index from '../component/Index'
import {Main, ShopCart, Orders} from '../container'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actions from '../actions'

const AppContainer = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return false;
    }
    return true;
  },
  _onMenuEnter(menu, params, replace) {
    switch (menu) {
      case 'orders':
        this.props.queryOrders({})
        return
      case 'main':
        this.props.search({})
        return
      default:
        console.log('-----------------')
        return
    }
  },
  render() {
    return (
      <Provider store={this.props.store}>
      <div>
        <Router history={this.props.history}>
          <Route path="/" component={Index} />
          <Route path="/admin" component={App}>
            <Route path="index" component={Main} onEnter={({params}, replace) => this._onMenuEnter('main', params, replace)} />
            <Route path="shopCart" component={ShopCart} />
            <Route path="orders" component={Orders} onEnter={({params}, replace) => this._onMenuEnter('orders', params, replace)} />
          </Route>
        </Router>
      </div>
    </Provider>
    )
  }
})

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
