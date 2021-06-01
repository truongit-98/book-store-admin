import BigNumber from 'bignumber.js';
import {
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY,
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY_SUCCEED,
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY_FAILED,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_SUCCEED,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_FAILED,
} from '../actions/order_transaction_history/action_types';
import utils from '../../common/utils';

export default (
  state = {
    orderTransactions: [],
    orderPairs: [],
    totalCount: 0,
  }, action,
) => {
  switch (action.type) {
    // Fetch filter pairs
    case FETCH_FILTER_ORDER_TRANSACTION_HISTORY:
      return {
        ...state,
      };
    case FETCH_FILTER_ORDER_TRANSACTION_HISTORY_SUCCEED:
      window._.forEach(action.params.data, (item) => {
        item.pair = `${item.coin}/${item.currency}`;
        item.amount = utils.formatCurrency(item.amount);
        item.quantity = utils.formatCurrency(item.quantity);
        item.fee = utils.formatCurrency(item.fee);
      });
      return {
        ...state,
        orderTransactions: action.params.data,
        totalCount: action.params.totalCount,
      };
    case FETCH_FILTER_ORDER_TRANSACTION_HISTORY_FAILED:
      return {
        ...state,
      };
    case FETCH_PAIRS_ORDER_TRANSACTION_HISTORY:
      return {
        ...state,
      };
    case FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_SUCCEED:
      return {
        ...state,
        orderPairs: action.params.data,
      };
    case FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_FAILED:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
