import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../component/front/Main';
import actions from '../actions';

function mapStateToProps(state) {
  return {
    ...state.products
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
