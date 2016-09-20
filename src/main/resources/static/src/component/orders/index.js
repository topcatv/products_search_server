import React from 'react';
import { Table, Icon, Button } from 'antd'
import OrderDetailModal from './detailModal'

const Orders = React.createClass({
  getInitialState() {
    return {
      orderDetails: [],
      visible: false
    };
  },
  showDetail(order) {
    this.setState({
      visible: true,
      orderDetails: order.items
    })
  },
  _columns() {
    return [
      {
        key: 'id',
        title: '定单编号',
        dataIndex: 'id'
      }, {
        key: 'createDate',
        title: '创建时间',
        dataIndex: 'createDate',
        render: (createDate) => new Date(createDate).toLocaleString()
      }, {
        key: 'op',
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => (
          <Button size="small" onClick={() => this.showDetail(record)}><Icon type="eye-o" />查看</Button>
        )
      }
    ];
  },
  render() {
    const { current, pageSize, total } = this.props.pageInfo;
    this.pagination = {
      current,
      pageSize,
      total,
      showSizeChanger: true,
      showTotal: (t) => `共 ${t} 条记录`,
      onShowSizeChange: (c, ps) => {
        this.props.queryOrders({
          pageNo: c,
          pageSize: ps
        });
      },
      onChange: (c) => {
        this.props.queryOrders({
          pageNo: c,
          pageSize
        });
      }
    };
    return (
      <div>
        <OrderDetailModal visible={this.state.visible} items={this.state.orderDetails} handleOk={() => this.setState({visible: false})} />
        <Table columns={this._columns()}
          rowKey={(record) => record.id}
          dataSource={this.props.items} loading={this.props.loading}
          pagination={this.pagination}
        />
    </div>
    );
  }
});

export default Orders;
