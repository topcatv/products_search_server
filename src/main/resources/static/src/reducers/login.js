import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_COMPLETE
} from '../actions/login'

const initialState = {
  results: {},
  loading: false
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        loading: action.isLogining
      });
    case REQUEST_LOGIN_COMPLETE:
      return Object.assign({}, state, action.result, {
        loading: action.isLogining
      });
    default:
      return state;
  }
}
