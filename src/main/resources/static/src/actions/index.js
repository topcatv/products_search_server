import * as products from './products';
import * as login from './login';
import * as shopCart from './shopCart';
import * as orders from './orders';

const actions = {
  ...products,
  ...login,
  ...shopCart,
  ...orders
};

export default actions;
