import history from './history';
import fetch from 'isomorphic-fetch';
import qs from 'qs';

const BASE_URL = ''; // for prod
//const BASE_URL = '/api/'; // for dev

const utils = {
  goto_page: (path = '/', context = 'admin') => {
    if (location.hash.indexOf(`${context}/${path}?`) === -1) {
      history.pushState(null, `${context}\${path}`);
    }
  },
  post: (url, data, context = BASE_URL) => {
    const result = fetch(context + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include',
      body: qs.stringify(data)
    });
    return result;
  },
  get: (url, data, context = BASE_URL) => {
    const result = fetch(`${context}${url}?${qs.stringify(data)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      credentials: 'include'
    });
    return result;
  }
};

export default utils;
