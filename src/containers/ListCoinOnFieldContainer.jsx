import { connect } from 'react-redux';
import CoinSettingComponent from '../component/AddCoin/CoinSettingComponent';
import actions from '../redux/actions/setting_data/index';

const mapStateToProps = (state) => ({
  coins: state.setting.coins,
  arrCoins: state.setting.arrCoins,
});

const mapDispatchToProps = (dispatch) => ({
//   userListAction: (params, callback) => {
//     dispatch(actions.userListAction(params, callback));
//   },
  selectCoin: (coin) => {
    dispatch(actions.selectCoin(coin));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(CoinSettingComponent);
