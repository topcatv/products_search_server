import React from 'react';
import {
  QueueAnim,
  Row,
  Table,
  Form,
  Input,
  Button
} from 'antd';
const FormItem = Form.Item;

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
  }
];

let Main = React.createClass({
  getInitialState() {
    return {
      pagination: {
      }
    };
  },
  componentWillReceiveProps(nextProps) {
    let currentPage = 1;
    if (nextProps.products.params) {
      currentPage = nextProps.products.params.pageNo || 1;
    }
    this.setState({
      pagination: {
        total: nextProps.products.totalElements,
        current: currentPage,
        onShowSizeChange: (current, pageSize) => {
          const params = {
            pageSize,
            pageNo: current
          };
          this.props.search(Object.assign({}, this.props.form.getFieldsValue(), params));
        },
        onChange: (current) => {
          console.log('Current: ', current);
          const params = {
            pageNo: current
          };
          this.props.search(Object.assign({}, this.props.form.getFieldsValue(), params));
        }
      }
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.props.form.getFieldsValue());
  },
  handleTableChange(pagination, filters, sorter) {
    const pager = this.state.pagination;
    pager.current = pagination.current || 1;
    this.setState({pagination: pager});
    const params = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    };
    for (const key in filters) {
      if ({}.hasOwnProperty.call(filters, key)) {
        params[key] = filters[key];
      }
    }
    this.props.search(Object.assign({}, this.props.form.getFieldsValue(), params));
  },
  render() {
    const {getFieldProps} = this.props.form;
    return (
      <QueueAnim delay={500} type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
        <Row key="1">
          <Form inline onSubmit={this.handleSubmit}>
            <FormItem label="商品名：">
              <Input placeholder="请输入商品名" {...getFieldProps('name')}/>
            </FormItem>
            <FormItem label="商品条码：">
              <Input placeholder="请输入商品条码" {...getFieldProps('barCode')}/>
            </FormItem>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form>
        </Row>
        <br/>
        <Row key="2">
          <Table columns={columns}
            rowKey={record => record.id}
            dataSource={this.props.products.content}
            pagination={this.state.pagination}
            onChange={this.handleTableChange}
          />
        </Row>
      </QueueAnim>
    );
  }
});
Main = Form.create()(Main);

module.exports = Main;
