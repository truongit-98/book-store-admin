import {
  FETCH_FILTER_SETTING_FEE_HISTORY,
  FETCH_FILTER_SETTING_FEE_HISTORY_SUCCEED,
} from '../actions/setting_fee_transaction/action_types';

export default (
  state = {
    settingFee: {},
  }, action,
) => {
  switch (action.type) {
    case FETCH_FILTER_SETTING_FEE_HISTORY:
      return {
        ...state,
      };
    case FETCH_FILTER_SETTING_FEE_HISTORY_SUCCEED:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};
