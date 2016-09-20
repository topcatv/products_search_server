import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Orders from '../../component/orders';
import actions from '../../actions';

function mapStateToProps(state) {
  return {
    pageInfo: state.orders.pageInfo,
    items: state.orders.items,
    loading: state.orders.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
