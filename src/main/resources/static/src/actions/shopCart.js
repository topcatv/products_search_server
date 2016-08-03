export const REQUEST_CART_ADD = 'REQUEST_CART_ADD';
export const REQUEST_CART_ADD_COMPLETE = 'REQUEST_CART_ADD_COMPLETE';

function requestAdd() {
  return {
    type: REQUEST_CART_ADD
  };
}

function addComplete(item) {
  return {
    type: REQUEST_CART_ADD_COMPLETE,
    item
  };
}

export function add(item) {
  return (dispatch) => {
    dispatch(requestAdd());
    return dispatch(addComplete(item));
  };
}
