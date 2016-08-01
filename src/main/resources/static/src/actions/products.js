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
  const data = {
    ...queryParams.params,
    pageNo: queryParams.pagination.current,
    pageSize: queryParams.pagination.pageSize
  };
  return (dispatch) => {
    dispatch(requestSearch());
    return utils.get(API.SEARCH_URL, data)
    .then((json) => {
      utils.checkJson(json);
      const pagination = Object.assign({}, queryParams.pagination, {total: json.data.totalElements});
      dispatch(completeSearch(Object.assign({}, json.data, {pagination})));
    });
  };
}
