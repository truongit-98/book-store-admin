import BigNumber from 'bignumber.js';
import {
  FETCH_FILTER_ORDER_HISTORY,
  FETCH_FILTER_ORDER_HISTORY_SUCCEED,
  FETCH_FILTER_ORDER_HISTORY_FAILED,
  FETCH_PAIRS_ORDER_HISTORY,
  FETCH_PAIRS_ORDER_HISTORY_SUCCEED,
  FETCH_PAIRS_ORDER_HISTORY_FAILED,
} from '../actions/order_history/action_types';
import utils from '../../common/utils';

export default (
  state = {
    orderHistory: [],
    orderPairs: [],
    totalCount: 0,
  }, action,
) => {
  switch (action.type) {
    // fetch order history
    case FETCH_FILTER_ORDER_HISTORY:
      return {
        ...state,
      };
    case FETCH_FILTER_ORDER_HISTORY_SUCCEED:
      return {
        ...state,
        orderHistory: action.params.data,
        totalCount: action.params.data[0]?.total_count,
      };
    case FETCH_FILTER_ORDER_HISTORY_FAILED:
      return {
        ...state,
      };
    case FETCH_PAIRS_ORDER_HISTORY:
      return {
        ...state,
      };
    case FETCH_PAIRS_ORDER_HISTORY_SUCCEED:
      return {
        ...state,
        orderPairs: action.params.data,
      };
    case FETCH_PAIRS_ORDER_HISTORY_FAILED:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
