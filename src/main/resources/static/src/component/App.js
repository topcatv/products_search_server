import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Main from '../container/Main';
import utils from '../common/utils';
import '../../static/css/app.less';
import { Menu, Breadcrumb, Icon, Row, Badge } from 'antd';
const SubMenu = Menu.SubMenu;

const App = React.createClass({
  componentWillReceiveProps(nextProps) {
    this.shopCartSize = nextProps.shopCartSize;
  },
  exit() {
    this.props.logout();
  },
  menuClick(e) {
    if (e.key === 'logout') {
      this.exit();
    }
    if (e.key === 'shop_cart') {
      utils.goto_page('shopCart');
    }
  },
  render() {
    if (!utils.isLogin(this.props)) {
      // history.replace({
      //   pathname: '/'
      // });
      utils.goto_page('', '');
      return false;
    }
    this.shopCartSize = this.props.shopCartSize || 0;
    return (
      <div>
        <div className="ant-layout-aside">
          <aside className="ant-layout-sider">
            <div className="ant-layout-logo"></div>
            <Menu
              mode="inline"
              theme="dark"
              defaultSelectedKeys={['index']}
              defaultOpenKeys={['sub1']}
              onClick={(e) => utils.goto_page(e.key)}
            >
              <SubMenu key="sub1" title={< span > <Icon type="user" />功能 </span>}>
                <Menu.Item key="index">产品查询</Menu.Item>
                <Menu.Item key="orders">我的订单</Menu.Item>
              </SubMenu>
            </Menu>
          </aside>
          <div className="ant-layout-main">
            <Row className="ant-layout-header">
              <Menu onClick={this.menuClick}
                mode="horizontal"
              >
                <Menu.Item key="logout">
                  <Icon type="user" />退出
                </Menu.Item>
                <Menu.Item key="shop_cart">
                  <Badge count={this.shopCartSize} style={{marginLeft: '8px'}}>
                    <Icon type="shopping-cart" />我的货单
                  </Badge>
                </Menu.Item>
              </Menu>
            </Row>
            <div className="ant-layout-breadcrumb">
              <Breadcrumb>
                {
                  this.props.breadcrumb.map((bc) => (
                    <Breadcrumb.Item key={bc.key}>{bc.text}</Breadcrumb.Item>
                  ))
                }
              </Breadcrumb>
            </div>
            <div className="ant-layout-container">
              <div className="ant-layout-content">
                <div style={{ height: 620 }}>
                  {this.props.children || <Main />}
                </div>
              </div>
            </div>
            <div className="ant-layout-footer">
              版权所有 © 2016 由四维海购技术部支持
            </div>
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    breadcrumb: state.breadcrumb,
    shopCartSize: state.shopCart.items.length,
    result: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
