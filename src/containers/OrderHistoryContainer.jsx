import { connect } from 'react-redux';
import actions from '../redux/actions/order_history';
import OrderHistory from '../component/order_history/OrderHistory';

const mapStateToProps = (state) => ({
  orderHistory: state.orderHistory,
  coinSettings: state.setting.coinSettings,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFilterOrderHistoryAction: (params) => {
    dispatch(actions.fetchFilterOrderHistoryAction(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
