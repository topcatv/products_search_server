import {
  REQUEST_ADD,
  REQUEST_ADD_COMPLETE
} from '../actions/shopCart'

const initialState = {
  isProcessing: false,
  items: []
}

export default function shopCart(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ADD:
      return {
        ...state,
        isProcessing: action.isProcessing
      };
    case REQUEST_ADD_COMPLETE:
      return {
        ...state,
        items: [
          ...state.items,
          action.item
        ],
        isProcessing: action.isProcessing
      };
    default:
      return state;
  }
}
