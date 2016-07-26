import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_SEARCH_COMPLETE = 'REQUEST_SEARCH_COMPLETE';

function requestSearch() {
  return {
    type: REQUEST_SEARCH,
    isFetching: true
  };
}

function completeSearch(products) {
  return {
    type: REQUEST_SEARCH_COMPLETE,
    isFetching: false,
    products
  };
}

export function search(queryParams) {
  return (dispatch) => {
    dispatch(requestSearch());
    return utils.get(API.SEARCH_URL, queryParams)
    .then((req) => req.json())
    .then((json) => {
      dispatch(completeSearch(Object.assign({}, json, {params: queryParams})));
    });
  };
}
