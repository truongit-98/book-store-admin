import { connect } from 'react-redux';
import Tools from '../component/Tools';
import actions from '../redux/actions/tools';

const mapStateToProps = (state) => ({
  userInfo: state.tools?.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserByAddress: (params, callback) => {
    dispatch(actions.onFetchUserByAddress(params, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
