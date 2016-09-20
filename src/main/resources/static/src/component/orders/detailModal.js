
import React from 'react'
import { Modal, Table, Button } from 'antd'

const OrderDetailModal = React.createClass({
  _columns() {
    return [
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
        dataIndex: 'count'
      }
    ];
  },
  render() {
    return (
        <Modal title="订单明细" visible={this.props.visible}
          onOk={this.props.handleOk} onCancel={this.props.handleOk}
          width="800px"
          footer={[
            <Button key="btnOk" type="primary" size="large" onClick={this.props.handleOk}>
              确定
            </Button>
          ]}
        >
          <Table columns={this._columns()}
            rowKey={(record) => record.id}
            dataSource={this.props.items}
            pagination={false}
          />
        </Modal>
    );
  }
})

export default OrderDetailModal
