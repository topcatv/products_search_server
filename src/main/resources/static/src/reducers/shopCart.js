import {
  REQUEST_ADD,
  REQUEST_ADD_COMPLETE,
  REQUEST_REMOVE,
  REQUEST_REMOVE_COMPLETE,
  REQUEST_CART_LOAD_COMPLETE,
  REQUEST_SUBMIT_ORDER,
  REQUEST_SUBMIT_ORDER_COMPLETE,
  REQUEST_COUNT_CHANGE_COMPLETE
} from '../actions/shopCart'
import {
  REQUEST_LOGOUT
} from '../actions/login'
import initialState from './initialState'

function itemMap(item, itemId, totalCount) {
  if (itemId === item.id) {
    return {
      ...item,
      count: totalCount || (((!item.count) ? 0 : item.count) + 1)
    }
  }
  return item;
}

function addItem(items, item) {
  if (items.length === 0) {
    return [{
      ...item,
      count: 1
    }];
  }
  if (!items.some((it) => it.id === item.id)) {
    items.push(item);
  }
  return items.map((it) => itemMap(it, item.id));
}

function removeItem(items, itemId) {
  return items.filter((item) => item.id !== itemId);
}

function itemCountChange(items, itemId, count) {
  return items.map((it) => itemMap(it, itemId, count));
}

export default function shopCart(state = initialState.shopCart, action) {
  switch (action.type) {
    case REQUEST_COUNT_CHANGE_COMPLETE:
      return {
        ...state,
        items: itemCountChange(state.items, action.itemId, action.count)
      }
    case REQUEST_ADD:
    case REQUEST_REMOVE:
    case REQUEST_SUBMIT_ORDER:
      return {
        ...state,
        isProcessing: action.isProcessing
      };
    case REQUEST_ADD_COMPLETE:
      return {
        ...state,
        items: addItem(state.items, action.item),
        isProcessing: action.isProcessing
      };
    case REQUEST_REMOVE_COMPLETE:
      return {
        ...state,
        items: removeItem(state.items, action.itemId),
        isProcessing: action.isProcessing
      };
    case REQUEST_CART_LOAD_COMPLETE:
      return {
        ...state,
        items: action.result.data
      };
    case REQUEST_SUBMIT_ORDER_COMPLETE:
      return {
        ...state,
        items: []
      };
    case REQUEST_LOGOUT:
      return {
        ...initialState.shopCart
      };
    default:
      return state;
  }
}
