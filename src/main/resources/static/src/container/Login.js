import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../component/Login';
import actions from '../actions';

function mapStateToProps(state) {
  return {
    result: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
