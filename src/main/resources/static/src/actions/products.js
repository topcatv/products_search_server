import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_SEARCH = 'REQUEST_SEARCH';
export const REQUEST_SEARCH_COMPLETE = 'REQUEST_SEARCH_COMPLETE';

function requestSearch() {
  return {
    type: REQUEST_SEARCH,
    isProcessing: true
  };
}

function completeSearch(products) {
  return {
    type: REQUEST_SEARCH_COMPLETE,
    isProcessing: false,
    content: products.content,
    pageInfo: {
      current: (products.number + 1),
      pageSize: products.size,
      total: products.totalElements
    }
  };
}

export function search(queryParams) {
  return (dispatch) => {
    dispatch(requestSearch());
    return utils.get(API.SEARCH_URL, queryParams)
    .then((json) => {
      utils.checkJson(json, dispatch);
      dispatch(completeSearch(json.data));
    });
  };
}
