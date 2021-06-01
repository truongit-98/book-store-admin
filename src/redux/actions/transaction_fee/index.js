import {
  UPDATE_TRANSACTION_FEE,
  UPDATE_TRANSACTION_FEE_SUCCEED,
  UPDATE_TRANSACTION_FEE_FAILED,
} from './action_types';

export default {
  onUpdateTransactionFee: (data) => ({
    type: UPDATE_TRANSACTION_FEE,
    params: {
      data,
    },
  }),
  onUpdateLimitWithdrawalActionSucceed: (data) => ({
    type: UPDATE_TRANSACTION_FEE_SUCCEED,
    params: {
      data,
    },
  }),
  onUpdateLimitWithdrawalActionFailed: (err) => ({
    type: UPDATE_TRANSACTION_FEE_FAILED,
    params: {
      err,
    },
  }),
};
