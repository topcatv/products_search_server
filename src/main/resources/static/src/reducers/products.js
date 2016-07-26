import { REQUEST_SEARCH, REQUEST_SEARCH_COMPLETE } from '../actions/products';

export default function products(state = {}, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, action.products);
    case REQUEST_SEARCH_COMPLETE:
      return Object.assign({}, state, action.products);
    default:
      return state;
  }
}
