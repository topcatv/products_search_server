import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_COMPLETE
} from '../actions/products'
import {
  REQUEST_LOGOUT
} from '../actions/login'
import initialState from './initialState'

export default function products(state = initialState.products, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return {
        ...state,
        loading: action.isProcessing
      };
    case REQUEST_SEARCH_COMPLETE:
      return {
        ...state,
        pageInfo: action.pageInfo,
        content: action.content,
        loading: action.isProcessing
      };
    case REQUEST_LOGOUT:
      return {
        ...initialState.products
      };
    default:
      return state;
  }
}
