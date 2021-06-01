import { connect } from 'react-redux';
import actions from '../redux/actions/admin';
import AdminLoginHistory from '../component/AdminLoginHistory';

const mapStateToProps = (state) => ({
  loginHistories: state.admin.loginHistories,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchAdminLoginHistory: (params, callback) => {
    dispatch(actions.onFetchAdminLoginHistory(params, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginHistory);
