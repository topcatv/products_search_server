import React from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message,
  Spin
} from 'antd'
import QueueAnim from 'rc-queue-anim'

import utils from '../common/utils'

const FormItem = Form.Item;

const Login = React.createClass({
  mixins: [Form.ValueMixin],

  getInitialState() {
    return {
      formData: {
        username: undefined,
        password: undefined,
        rememberMe: undefined
      },
      loading: false
    };
  },

  componentWillMount() {
    if (this.props.results.shiroLoginFailure) {
      message.error(this.props.results.message, 5);
    } else {
      utils.goto_page('index');
    }
  },

  login() {
    this.props.login(this.state.formData);
  },

  handleSubmit(e) {
    e.preventDefault();
    this.login();
  },

  render() {
    const formData = this.state.formData;
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <QueueAnim type={['top', 'bottom']} delay={300}>
            {[
              <div className = "header" key = "0" ><div>
                <h1>Web ide</h1>
                <p>Integrated Development Environment<br />代码编辑，代码生成，界面设计，调试，编译</p>
              </div>
              <hr />
              <br />
              <br />
              </div>,
              <Row key = "1" type = "flex" justify = "center" >
                <Col span="10">
                  <h2>登录</h2><br /><hr /><br /><br />
                </Col>
              </Row>,
              <Row key="2" type="flex" justify="center">
                <Col span="10">
                  <Form horizontal onSubmit={this.handleSubmit}>
                    <FormItem id="username" label="账户：">
                      <Input placeholder="请输入账户名" id="username"
                        name="username"
                        onChange={this.setValue.bind(this, 'username')}
                        value={formData.username}
                      />
                    </FormItem>
                    <FormItem id = "password" label = "密码：" >
                      <Input type="password" placeholder="请输入密码"
                        id="password" name="password"
                        onChange={this.setValue.bind(this, 'password')} value={formData.password}
                      />
                    </FormItem>
                    <FormItem>
                      <label className="ant-checkbox-inline">
                        <Checkbox name="rememberMe" value={formData.rememberMe}
                          onChange={this.setValue.bind(this, 'rememberMe')}
                        /> 记住我
                      < /label>
                    </FormItem >
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </Col>
              </Row>,
              <Row key = "3" type = "flex" justify = "center" >
                <Col span="10" offset="6">四维众创 版权所有 © 2016</Col>
              </Row>
            ]}
          </QueueAnim>
        </Spin>
      </div>
    );
  }
});

export default Login;
