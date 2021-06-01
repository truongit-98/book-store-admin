import { connect } from 'react-redux';
import actions from '../redux/actions/transaction_fee';
import TransactionFee from '../component/TransactionFee';

const mapStateToProps = (state) => ({
  coins: state.setting.coins,
  arrCoins: state.setting.arrCoins,
  limits: state.setting.limitWithdrawals,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeTransactionFeeAction: (params) => {
    dispatch(actions.onUpdateTransactionFee(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionFee);
