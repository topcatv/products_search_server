import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_ADD = 'REQUEST_ADD';
export const REQUEST_ADD_COMPLETE = 'REQUEST_ADD_COMPLETE';
export const REQUEST_REMOVE = 'REQUEST_REMOVE';
export const REQUEST_REMOVE_COMPLETE = 'REQUEST_REMOVE_COMPLETE';
export const REQUEST_COUNT_CHANGE = 'REQUEST_COUNT_CHANGE';
export const REQUEST_COUNT_CHANGE_COMPLETE = 'REQUEST_COUNT_CHANGE_COMPLETE';
export const REQUEST_CART_LOAD_COMPLETE = 'REQUEST_CART_LOAD_COMPLETE';
export const REQUEST_SUBMIT_ORDER = 'REQUEST_SUBMIT_ORDER';
export const REQUEST_SUBMIT_ORDER_COMPLETE = 'REQUEST_SUBMIT_ORDER_COMPLETE';

function requestAddShop() {
  return {
    type: REQUEST_ADD,
    isProcessing: true
  };
}

function completeAddShop(item) {
  return {
    type: REQUEST_ADD_COMPLETE,
    isProcessing: false,
    item
  };
}

function requestRemoveItem() {
  return {
    type: REQUEST_REMOVE,
    isProcessing: true
  };
}

function completeRemoveItem(itemId) {
  return {
    type: REQUEST_REMOVE_COMPLETE,
    isProcessing: false,
    itemId
  };
}
function requesCountChange() {
  return {
    type: REQUEST_COUNT_CHANGE,
    isProcessing: true
  };
}
function completeCountChange(itemId, count) {
  return {
    type: REQUEST_COUNT_CHANGE_COMPLETE,
    isProcessing: false,
    itemId,
    count
  };
}

function requesSubmitOrder() {
  return {
    type: REQUEST_SUBMIT_ORDER,
    isProcessing: true
  };
}
function completeSubmitOrder(result) {
  return {
    type: REQUEST_SUBMIT_ORDER_COMPLETE,
    result
  };
}

function completeloadCart(result) {
  return {
    type: REQUEST_CART_LOAD_COMPLETE,
    result
  };
}

export function addToCart(item) {
  return (dispatch) => {
    dispatch(requestAddShop());
    return utils.post(API.SHOP_URL, {itemId: item.id})
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeAddShop(item));
    });
  };
}

export function removeItem(itemId) {
  return (dispatch) => {
    dispatch(requestRemoveItem());
    return utils.delete(API.SHOP_URL, {itemId})
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeRemoveItem(itemId));
    });
  };
}

export function itemCountChange(itemId, count) {
  return (dispatch) => {
    dispatch(requesCountChange());
    return utils.post(`${API.SHOP_URL}\\item\\${itemId}`, {count})
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeCountChange(itemId, count));
    });
  };
}

export function loadCart() {
  return (dispatch) => {
    return utils.get(API.SHOP_CART_LOAD_URL)
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeloadCart(json));
    });
  };
}

export function submitOrder(items) {
  return (dispatch) => {
    dispatch(requesSubmitOrder());
    return utils.post(API.ORDER, items, true)
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeSubmitOrder(json));
    });
  };
}
