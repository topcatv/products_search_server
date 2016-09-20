import utils from '../common/utils'
import { API } from '../constants/globals'

export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const REQUEST_ORDERS_COMPLETE = 'REQUEST_ORDERS_COMPLETE';

function requestOrders() {
  return {
    type: REQUEST_ORDERS,
    isProcessing: true
  }
}

function completeRequestOrders(orders) {
  return {
    type: REQUEST_ORDERS_COMPLETE,
    currentBreadcrumb: {key: 'orders', text: '我的订单'},
    isProcessing: false,
    content: orders.content,
    pageInfo: {
      current: (orders.number + 1),
      pageSize: orders.size,
      total: orders.totalElements
    }
  }
}

export function queryOrders(queryParams) {
  return (dispatch) => {
    dispatch(requestOrders());
    return utils.get(API.ORDERS_URL, queryParams)
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeRequestOrders(json.data));
    });
  };
}
