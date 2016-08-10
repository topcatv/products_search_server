import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_LOGIN_COMPLETE
} from '../actions/login'
import initialState from './initialState'

export default function login(state = initialState.login, action) {
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
        ...initialState.login
      };
    default:
      return state;
  }
}
