import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_LOGIN_COMPLETE
} from '../actions/login'

const initialState = {
  result: {},
  isLogin: false,
  isProcessing: false
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isProcessing: action.isProcessing
      };
    case REQUEST_LOGIN_COMPLETE:
      return {
        ...state,
        result: action.result,
        isProcessing: action.isProcessing,
        isLogin: action.isLogin
      };
    case REQUEST_LOGOUT:
      return {
        ...state,
        result: action.result,
        isLogin: action.isLogin
      };
    default:
      return state;
  }
}
