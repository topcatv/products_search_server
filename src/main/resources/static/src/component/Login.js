import React from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Spin
} from 'antd'
import QueueAnim from 'rc-queue-anim'

import utils from '../common/utils'

const FormItem = Form.Item;

let Login = React.createClass({

  login(params) {
    this.props.login(params);
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.login(values);
    });
  },

  render() {
    if (utils.isLogin(this.props)) {
      utils.goto_page('index');
      return false;
    }
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const usernameProps = getFieldProps('username', {
      rules: [
        {required: true, whitespace: true, message: '用户名必填'}
      ]
    });
    const passwordProps = getFieldProps('password', {
      rules: [
        {required: true, min: 6, message: '至少为 6 个字符'}
      ]
    });
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    };
    return (
      <div>
          <QueueAnim type={['top', 'bottom']} delay={300}>
            {[
              <div className = "header" key = "0" ><div>
                <h1>四维海购</h1>
                <p>产品管理功能</p>
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
                  <Spin spinning={this.props.result.isProcessing}>
                    <Form horizontal onSubmit={this.handleSubmit} form={this.props.form}>
                      <FormItem {...formItemLayout} label="账户：" hasFeedback
                        help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
                      >
                        <Input placeholder="请输入账户名" {...usernameProps} />
                      </FormItem>
                      <FormItem {...formItemLayout} label = "密码：" hasFeedback
                        help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
                      >
                        <Input type="password" placeholder="请输入密码" {...passwordProps} />
                      </FormItem>
                      <FormItem wrapperCol={{ offset: 3 }}>
                          <Checkbox name="rememberMe" {...getFieldProps('rememberMe')} /> 记住我
                      </FormItem >
                      <FormItem wrapperCol={{ offset: 3 }}>
                        <Button type="primary" htmlType="submit">登录</Button>
                      </FormItem>
                    </Form>
                  </Spin>
                </Col>
              </Row>,
              <Row key = "3" type = "flex" justify = "center" >
                <Col span="10" offset="6">四维众创 版权所有 © 2016</Col>
              </Row>
            ]}
          </QueueAnim>
      </div>
    );
  }
});

Login = Form.create()(Login);

export default Login;
