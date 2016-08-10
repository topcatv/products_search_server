import { search } from './products';
import { login, logout } from './login';
import { addToCart, removeItem } from './shopCart';

const actions = {
  search,
  login,
  logout,
  addToCart,
  removeItem
};

export default actions;
