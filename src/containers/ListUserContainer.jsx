import { connect } from 'react-redux';
import actions from '../redux/actions/user';
import ListUser from '../component/ListUser';

const mapStateToProps = (state) => ({
  users: state.user.users,
  info: state.user.info,
});

const mapDispatchToProps = (dispatch) => ({
  userListAction: (params, callback) => {
    dispatch(actions.userListAction(params, callback));
  },
  searchUsers: (params, callback) => {
    dispatch(actions.userSearchAction(params, callback));
  },
  userInfo : (params, callback) => {
    dispatch(actions.userInfoAction(params, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
