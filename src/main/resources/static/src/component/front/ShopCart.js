import React from 'react';
import { Row, Table, Button, InputNumber, Popconfirm } from 'antd'
import QueueAnim from 'rc-queue-anim'

const ShopCart = React.createClass({
  countChange(record, count) {
    this.props.itemCountChange(record.id, count);
  },
  removeFromCart(id) {
    this.props.removeItem(id);
  },
  render() {
    const columns = [
      {
        key: 'name',
        title: '商品名',
        dataIndex: 'name'
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
        key: 'count',
        title: '数量',
        dataIndex: 'count',
        render: (count, record) => (
          <InputNumber min={1} defaultValue={count} onChange={(v) => this.countChange(record, v)} style={{width: '55px'}} />
        )
      }, {
        key: 'id',
        title: '操作',
        dataIndex: 'id',
        render: (id) => (
          <Popconfirm placement="bottom" title="确定要删除这个商品吗？" onConfirm={() => this.removeFromCart(id)}>
            <Button size="small" style={{color: '#fff', background: '#f50'}}>-</Button>
          </Popconfirm>
        )
      }
    ];

    return (
      <QueueAnim delay={500} type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
        <Row key="1">
          <Button type="primary" icon="check" onClick={this.submit} style={{marginBottom: '8px'}} >提交订单</Button>
        </Row>
        <Row key="2">
          <Table columns={columns}
            rowKey={(record) => record.id}
            dataSource={this.props.shopCart.items} loading={this.props.shopCart.loading}
            pagination={false}
          />
        </Row>
        <Row key="3">
          <Button type="primary" icon="check" onClick={this.submit} style={{marginTop: '8px'}} >提交订单</Button>
        </Row>
      </QueueAnim>
    );
  }
});

export default ShopCart;
