import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';

function requestSearch(products) {
  return {
    type: REQUEST_SEARCH,
    products
  };
}

function fetchData(data) {
  return dispatch => {
    dispatch(requestSearch());
    return utils.get(API.SEARCH_URL, data)
    .then((req) => req.json())
    .then((json) => {
      json.params = data;
      dispatch(requestSearch(json));
    });
  };
}

export function search(data) {
  return (dispatch, getState) => {
    return dispatch(fetchData(data));
  };
}
