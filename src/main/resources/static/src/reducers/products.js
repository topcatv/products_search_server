import {
  REQUEST_SEARCH,
  REQUEST_SEARCH_COMPLETE
} from '../actions/products'

const initialState = {
  pageInfo: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  content: [],
  loading: false
}

export default function products(state = initialState, action) {
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
    default:
      return state;
  }
}
