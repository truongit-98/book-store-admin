import { connect } from 'react-redux';
import actions from '../redux/actions/transaction';
import TransactionHistory from '../component/TransactionHistory';

const mapStateToProps = (state) => ({
  trans: state.transaction.trans,
  // settings: state.settings,
  coins: state.setting.coins,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchTransHistoryAction: (params, callback) => {
    dispatch(actions.fetchTransHistoryAction(params, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
