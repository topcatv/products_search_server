import history from './history';
import fetch from 'isomorphic-fetch';
import qs from 'qs';
import { message } from 'antd';
import { REQUEST_LOGOUT } from '../actions/login';

// const BASE_URL = ''; // for prod
const BASE_URL = '/api/'; // for dev

const utils = {
  goto_page: (path = '', context = 'admin') => {
    if (location.hash.indexOf(`${context}/${path}?`) === -1) {
      history.push({
        pathname: `${context}/${path}`,
        // Extra location-specific state may be kept in session
        // storage instead of in the URL query string!
        state: null
      });
    }
  },
  checkJson: (json, dispatch) => {
    if (json.status === 401) {
      if (dispatch) {
        dispatch({type: REQUEST_LOGOUT, isLogin: false});
      }
    }
    if (json.status !== 200) {
      message.error(json.message, 5);
      throw new Error(json.message);
    }
  },
  checkResponse: (rep) => {
    if (rep.status >= 200 && rep.status < 300) {
      return rep
    }
    const error = new Error(rep.statusText);
    error.response = rep;
    throw error;
  },
  handleException: (ex) => {
    console.log('parsing failed', ex);
  },
  post: (url, data, jsonBody = false, context = BASE_URL) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (jsonBody) {
      headers['Content-Type'] = 'application/json';
    }
    const result = fetch(context + url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: jsonBody ? JSON.stringify(data) : qs.stringify(data)
    })
    .then(utils.checkResponse)
    .then((rep) => rep.json())
    .catch(utils.handleException);
    return result;
  },
  delete: (url, data, context = BASE_URL) => {
    const result = fetch(`${context}${url}?${qs.stringify(data)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include'
    })
    .then(utils.checkResponse)
    .then((rep) => rep.json())
    .catch(utils.handleException);
    return result;
  },
  get: (url, data, context = BASE_URL) => {
    const result = fetch(`${context}${url}?${qs.stringify(data)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include'
    })
    .then(utils.checkResponse)
    .then((rep) => rep.json())
    .catch(utils.handleException);
    return result;
  },
  isLogin: (props) => {
    return props.result.isLogin;
  }
};

export default utils;
