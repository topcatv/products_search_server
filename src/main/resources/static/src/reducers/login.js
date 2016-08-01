import {
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_LOGIN_COMPLETE
} from '../actions/login'

const initialState = {
  isLogin: false,
  loading: false
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        loading: action.isLogining
      });
    case REQUEST_LOGIN_COMPLETE:
    case REQUEST_LOGOUT:
      return Object.assign({}, state, action.result, {
        loading: action.isLogining,
        isLogin: action.isLogin
      });
    default:
      return state;
  }
}
