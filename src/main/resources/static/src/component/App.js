import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Main from '../container/Main';
import '../../static/css/site.css';
import { Menu, Breadcrumb, Icon, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;

const App = React.createClass({
  exit() {
    this.props.logout();
  },
  render() {
    return (
      <div>
        <div className="ant-layout-aside">
          <aside className="ant-layout-sider">
            <div className="ant-layout-logo"></div>
            <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
              <SubMenu key="sub1" title={< span > <Icon type="user" />功能 </span>}>
                <Menu.Item key="1">产品查询</Menu.Item>
              </SubMenu>
            </Menu>
          </aside>
          <div className="ant-layout-main">
            <Row className="ant-layout-header" type="flex" justify="end" align="middle">
                <Col span={4}><a href="javascript:void(0);" onClick={this.exit}><Icon type="user" />退出</a></Col>
            </Row>
            <div className="ant-layout-breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>产品查询</Breadcrumb.Item>
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
    results: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
