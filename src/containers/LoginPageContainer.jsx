import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginComponent from '../component/login_page/LoginPage';
import actions from '../redux/actions/login';

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({

  onLoginNormal: (params,callback) => {
    dispatch(actions.loginNormal(params,callback));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent));
