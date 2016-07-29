import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_COMPLETE = 'REQUEST_LOGIN_COMPLETE';

function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    isLogining: true
  };
}

function completeLogin(result) {
  return {
    type: REQUEST_LOGIN_COMPLETE,
    isLogining: false,
    result
  };
}

export function login(user) {
  return (dispatch) => {
    dispatch(requestLogin());
    return utils.get(API.LOGIN_URL, user)
    .then((req) => req.json())
    .then((json) => {
      dispatch(completeLogin(Object.assign({}, json, user)));
    });
  };
}
