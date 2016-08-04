import React from 'react';
import { Row, Table, Form, Input, Button, Icon } from 'antd'
import QueueAnim from 'rc-queue-anim'
const FormItem = Form.Item;

let Main = React.createClass({
  getInitialState() {
    const pagination = {
      defaultCurrent: 1,
      pageSize: 10,
      showTotal: (total) => `共 ${total} 条记录`,
      onShowSizeChange: (current, pageSize) => {
        pagination.current = current;
        pagination.pageSize = pageSize;
        this.props.search({params: this.props.form.getFieldsValue(), pagination});
      },
      onChange: (current) => {
        pagination.current = current;
        this.props.search({params: this.props.form.getFieldsValue(), pagination});
      }
    }
    return { pagination, loading: false };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      pagination: nextProps.pagination,
      loading: nextProps.loading
    });
  },
  addToCart(record) {
    //this.props.add(record);
    console.log(record);
  },
  handleSubmit(e) {
    e.preventDefault();
    const queryParams = {
      params: this.props.form.getFieldsValue(),
      pagination: this.state.pagination
    };
    queryParams.pagination.current = 1;
    this.props.search(queryParams);
  },
  _rowKey(recode) {
    return recode.id;
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
            <Button type="primary" htmlType="submit" icon="search" loading={this.state.loading}>查询</Button>
          </Form>
        </Row>
        <br />
        <Row key="2">
          <Table columns={columns}
            rowKey={this._rowKey}
            dataSource={this.props.products.content}
            pagination={this.state.pagination} loading={this.state.loading}
          />
        </Row>
      </QueueAnim>
    );
  }
});
Main = Form.create()(Main);

export default Main;
