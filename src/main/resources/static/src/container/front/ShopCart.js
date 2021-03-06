import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShopCart from '../../component/front/ShopCart';
import actions from '../../actions';

function mapStateToProps(state) {
  return {
    items: state.shopCart.items,
    loading: state.shopCart.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);
