import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_LOGIN_COMPLETE = 'REQUEST_LOGIN_COMPLETE';

function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    isProcessing: true
  };
}

function completeLogin(result) {
  return {
    type: REQUEST_LOGIN_COMPLETE,
    isProcessing: false,
    isLogin: true,
    result
  };
}

function completeLogout(result) {
  return {
    type: REQUEST_LOGOUT,
    isLogin: false,
    result
  };
}

export function logout() {
  return (dispatch) => {
    return utils.get(API.LOGOUT_URL)
    .then((json) => {
      utils.checkJson(json);
      dispatch(completeLogout(json));
    });
  };
}

export function login(user) {
  return (dispatch) => {
    dispatch(requestLogin());
    return utils.post(API.LOGIN_URL, user)
    .then((json) => {
      utils.checkJson(json);
      dispatch(completeLogin({
        ...json,
        user
      }));
    });
  };
}
