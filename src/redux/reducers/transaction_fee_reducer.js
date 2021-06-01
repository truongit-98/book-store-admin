import {
  UPDATE_TRANSACTION_FEE,
  UPDATE_TRANSACTION_FEE_SUCCEED,
} from '../actions/transaction_fee/action_types';

export default (
  state = {
    newLimitWithdrawal: {},
  }, action,
) => {
  switch (action.type) {
    case UPDATE_TRANSACTION_FEE:
      return {
        ...state,
      };
    case UPDATE_TRANSACTION_FEE_SUCCEED:
      return {
        ...state,
        newLimitWithdrawal: action.params.data,
      };
    default:
      return { ...state };
  }
};
