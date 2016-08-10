export default {
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
    content: [],
    loading: false
  },
  shopCart: {
    isProcessing: false,
    items: []
  }
};
