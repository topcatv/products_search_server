import React from 'react';
import { Row, Table, Form, Input, Button, Icon, notification } from 'antd'
import QueueAnim from 'rc-queue-anim'
const FormItem = Form.Item;

let Main = React.createClass({
  addToCart(record) {
    notification.info({
      duration: 1.5,
      message: '加入货单',
      description: (<div><Icon type="shopping-cart" />商品<strong>【{record.name}】</strong>已加入货单</div>)
    });
    this.props.addToCart(record);
  },
  handleSubmit(e) {
    e.preventDefault();
    const { pageSize } = this.props.pageInfo
    const queryParams = {
      ...this.props.form.getFieldsValue(),
      pageNo: 1,
      pageSize
    };
    this.props.search(queryParams);
  },
  render() {
    const { getFieldProps } = this.props.form;
    const columns = [
      {
        key: 'name',
        title: '商品名',
        dataIndex: 'name',
        render(text) {
          return <a href="javascript:void(0);">{text}</a>;
        }
      }, {
        key: 'barCode',
        title: '条码',
        dataIndex: 'barCode'
      }, {
        key: 'code',
        title: '商品编码',
        dataIndex: 'code'
      }, {
        key: 'specification',
        title: '规格',
        dataIndex: 'specification'
      }, {
        key: 'boxSize',
        title: '箱规',
        dataIndex: 'boxSize'
      }, {
        key: 'life',
        title: '保质期',
        dataIndex: 'life'
      }, {
        key: 'originCountry',
        title: '原产国',
        dataIndex: 'originCountry'
      }, {
        key: 'price',
        title: '供货价',
        dataIndex: 'price'
      }, {
        key: 'id',
        title: '加入货单',
        dataIndex: 'id',
        render: (id, record) => (
          <Button onClick={() => { this.addToCart(record) }}><Icon type="shopping-cart" />加入货单</Button>
        )
      }
    ];

    const { current, pageSize, total } = this.props.pageInfo;
    this.pagination = {
      current,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: (t) => `共 ${t} 条记录`,
      onShowSizeChange: (c, ps) => {
        this.props.search({
          ...this.props.form.getFieldsValue(),
          pageNo: c,
          pageSize: ps
        });
      },
      onChange: (c) => {
        this.props.search({
          ...this.props.form.getFieldsValue(),
          pageNo: c,
          pageSize
        });
      }
    };

    return (
      <QueueAnim delay={500} type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
        <Row key="1">
          <Form inline onSubmit={this.handleSubmit}>
            <FormItem label="商品名：">
              <Input placeholder="请输入商品名" {...getFieldProps('name')} />
            </FormItem>
            <FormItem label="商品条码：">
              <Input placeholder="请输入商品条码" {...getFieldProps('barCode')} />
            </FormItem>
            <Button type="primary" htmlType="submit" icon="search" loading={this.props.loading}>查询</Button>
          </Form>
        </Row>
        <br />
        <Row key="2">
          <Table columns={columns}
            rowKey={(record) => record.id}
            dataSource={this.props.items}
            pagination={this.pagination} loading={this.props.loading}
          />
        </Row>
      </QueueAnim>
    );
  }
});
Main = Form.create()(Main);

export default Main;
