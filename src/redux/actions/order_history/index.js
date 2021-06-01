import {
  FETCH_FILTER_ORDER_HISTORY,
  FETCH_FILTER_ORDER_HISTORY_SUCCEED,
  FETCH_FILTER_ORDER_HISTORY_FAILED,
  FETCH_PAIRS_ORDER_HISTORY,
  FETCH_PAIRS_ORDER_HISTORY_SUCCEED,
  FETCH_PAIRS_ORDER_HISTORY_FAILED,
} from './action_types';

export default {
  fetchFilterOrderHistoryAction: (params) => ({
    type: FETCH_FILTER_ORDER_HISTORY,
    params,
  }),

  fetchFilterOrderHistoryActionSucceed: (data, totalCount) => ({
    type: FETCH_FILTER_ORDER_HISTORY_SUCCEED,
    params: {
      data,
      totalCount,
    },
  }),

  fetchFilterOrderHistoryActionFailed: (err) => ({
    type: FETCH_FILTER_ORDER_HISTORY_FAILED,
    params: {
      err,
    },
  }),

  // fetch pairs
  fetchPairsOrderHistoryAction: (params) => ({
    type: FETCH_PAIRS_ORDER_HISTORY,
    params,
  }),

  fetchPairsOrderHistoryActionSucceed: (data) => ({
    type: FETCH_PAIRS_ORDER_HISTORY_SUCCEED,
    params: {
      data,
    },
  }),

  fetchPairsOrderHistoryActionFailed: (err) => ({
    type: FETCH_PAIRS_ORDER_HISTORY_FAILED,
    params: {
      err,
    },
  }),
};
