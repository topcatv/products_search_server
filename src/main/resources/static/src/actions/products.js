import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_SEARCH_COMPLETE = 'REQUEST_SEARCH_COMPLETE';

function requestSearch() {
  return {
    type: REQUEST_SEARCH,
    products: {loading: true}
  };
}

function completeSearch(state, products) {
  return {
    type: REQUEST_SEARCH_COMPLETE,
    products: Object.assign({}, state, products, {loading: false})
  };
}

export function search(queryParams) {
  return (dispatch, getState) => {
    dispatch(requestSearch());
    return utils.get(API.SEARCH_URL, queryParams)
    .then((req) => req.json())
    .then((json) => {
      dispatch(completeSearch(getState().products, Object.assign({}, json, {params: queryParams})));
    });
  };
}
