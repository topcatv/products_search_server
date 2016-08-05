import utils from '../common/utils';
import { API } from '../constants/globals';

export const REQUEST_ADD = 'REQUEST_ADD';
export const REQUEST_ADD_COMPLETE = 'REQUEST_ADD_COMPLETE';

function requestAddShop() {
  return {
    type: REQUEST_ADD,
    isProcessing: true
  };
}

function completeAddShop(item) {
  return {
    type: REQUEST_ADD_COMPLETE,
    isProcessing: false,
    item
  };
}

export function addToCart(item) {
  return (dispatch) => {
    dispatch(requestAddShop());
    dispatch(completeAddShop(item));
    // return utils.post(API.ADD_SHOP_URL, item.id)
    // .then((json) => {
    //   utils.checkJson(json);
    //   dispatch(completeAddShop(item));
    // });
  };
}
