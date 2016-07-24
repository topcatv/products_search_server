import { REQUEST_SEARCH } from '../actions/products';

export default function products(state = {}, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, action.products);
    default:
      return state;
  }
}
