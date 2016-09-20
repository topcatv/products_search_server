export default {
  breadcrumb: [{
    key: 'index',
    text: '首页'
  }],
  login: {
    result: {},
    isLogin: false,
    isProcessing: false
  },
  products: {
    pageInfo: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    items: [],
    loading: false
  },
  shopCart: {
    isProcessing: false,
    items: []
  },
  orders: {
    pageInfo: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    items: [],
    loading: false
  }
};
