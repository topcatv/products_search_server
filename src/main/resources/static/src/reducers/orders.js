import initialState from './initialState'

export default function products(state = initialState.orders, action) {
  switch (action.type) {
    case 'REQUEST_ORDERS':
      return {
        ...state,
        loading: action.isProcessing
      };
    case 'REQUEST_ORDERS_COMPLETE':
      return {
        ...state,
        pageInfo: action.pageInfo,
        items: action.content,
        loading: action.isProcessing
      };
    default:
      return state;
  }
}
