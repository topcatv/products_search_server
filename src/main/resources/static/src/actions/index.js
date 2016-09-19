import * as products from './products';
import * as login from './login';
import * as shopCart from './shopCart';

const actions = {
  ...products,
  ...login,
  ...shopCart
};

export default actions;
