import {
  FETCH_FILTER_SETTING_FEE_HISTORY,
  FETCH_FILTER_SETTING_FEE_HISTORY_SUCCEED,
  FETCH_FILTER_SETTING_FEE_HISTORY_FAILED,
} from './action_types';

export default {
  onUpdateSettingFeeAction: (data) => ({
    type: FETCH_FILTER_SETTING_FEE_HISTORY,
    params: {
      data,
    },
  }),
  onUpdateSettingFeeActionSucceed: (data) => ({
    type: FETCH_FILTER_SETTING_FEE_HISTORY_SUCCEED,
    params: {
      data,
    },
  }),
  onUpdateSettingFeeActionFailed: (err) => ({
    type: FETCH_FILTER_SETTING_FEE_HISTORY_FAILED,
    params: {
      err,
    },
  }),
};
