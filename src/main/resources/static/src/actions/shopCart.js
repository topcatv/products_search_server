import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_ADD = 'REQUEST_ADD';
export const REQUEST_ADD_COMPLETE = 'REQUEST_ADD_COMPLETE';
export const REQUEST_REMOVE = 'REQUEST_REMOVE';
export const REQUEST_REMOVE_COMPLETE = 'REQUEST_REMOVE_COMPLETE';

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
