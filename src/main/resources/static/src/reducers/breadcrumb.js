import {
  REQUEST_SEARCH_COMPLETE
} from '../actions/products'

import initialState from './initialState'

export default function products(state = initialState.breadcrumb, action) {
  switch (action.type) {
    case REQUEST_SEARCH_COMPLETE:
    case 'REQUEST_ORDERS_COMPLETE':
      return [...initialState.breadcrumb, action.currentBreadcrumb]
    default:
      return state;
  }
}
