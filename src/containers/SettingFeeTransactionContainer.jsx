import { connect } from 'react-redux';
import settingActions from '../redux/actions/setting_data';
import actions from '../redux/actions/setting_fee_transaction';
import SettingFeeTransaction from '../component/setting_transaction_fee/SettingFeeTransaction';

const mapStateToProps = (state) => ({
  coinSettings: state.setting.coinSettings,
  objCoinSettings: state.setting.objCoinSettings,
  coins: state.setting.coins,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSettingFeeTransactionAction: (params) => {
    dispatch(actions.onUpdateSettingFeeAction(params));
  },
  onCreateMarket: (params) => {
    dispatch(settingActions.createMarketAction(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingFeeTransaction);
