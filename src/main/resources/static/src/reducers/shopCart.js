import {
  REQUEST_CART_ADD,
  REQUEST_CART_ADD_COMPLETE
} from '../actions/shopCart'

const initialState = {
  items: {},
  loading: false
}

export default function shopCart(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CART_ADD:
      return Object.assign({}, state, { loading: true });
    case REQUEST_CART_ADD_COMPLETE: {
      const item = {};
      item[action.item.id] = action.item;
      console.log(item);
      return Object.assign({}, state, { items: Object.assign({}, state.items, item), loading: false });
    }
    default:
      return state;
  }
}
