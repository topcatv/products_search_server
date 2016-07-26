import { REQUEST_SEARCH, REQUEST_SEARCH_COMPLETE } from '../actions/products';

export default function products(state = {}, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, {loading: action.isFetching});
    case REQUEST_SEARCH_COMPLETE:
      return Object.assign({}, state, action.products, {loading: action.isFetching});
    default:
      return state;
  }
}
