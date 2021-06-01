import { connect } from 'react-redux';
import actions from '../redux/actions/user';
import LoginHistory from '../component/LoginHistory';

const mapStateToProps = (state) => ({
  loginHistories: state.user.loginHistories,
});

const mapDispatchToProps = (dispatch) => ({
  loginHistoryAction: (params, callback) => {
    dispatch(actions.loginHistoryAction(params, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginHistory);
