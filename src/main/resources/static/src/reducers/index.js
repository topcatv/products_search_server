import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import products from './products';
const rootReducer = combineReducers({
  routing: routeReducer,
  products
});

export default rootReducer;
