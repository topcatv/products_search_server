import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../../component/front/ShopCart';
import actions from '../../actions';

function mapStateToProps(state) {
  return {
    shopCart: state.shopCart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
