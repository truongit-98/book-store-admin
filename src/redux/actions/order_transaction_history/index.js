import {
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY,
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY_SUCCEED,
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY_FAILED,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_SUCCEED,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_FAILED,
} from './action_types';

export default {
  fetchFilterTransactionHistoryAction: (params) => ({
    type: FETCH_FILTER_ORDER_TRANSACTION_HISTORY,
    params,
  }),

  fetchFilterTransactionHistoryActionSucced: (data, totalCount) => ({
    type: FETCH_FILTER_ORDER_TRANSACTION_HISTORY_SUCCEED,
    params: {
      data,
      totalCount,
    },
  }),

  fetchFilterTransactionHistoryActionFailed: (err) => ({
    type: FETCH_FILTER_ORDER_TRANSACTION_HISTORY_FAILED,
    params: {
      err,
    },
  }),

  fetchPairsOrderTransactionHistoryAction: (params) => ({
    type: FETCH_PAIRS_ORDER_TRANSACTION_HISTORY,
    params,
  }),

  fetchPairsOrderTransactionHistoryActionSucceed: (data) => ({
    type: FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_SUCCEED,
    params: {
      data,
    },
  }),

  fetchPairsOrderTransactionHistoryActionFailed: (err) => ({
    type: FETCH_PAIRS_ORDER_TRANSACTION_HISTORY_FAILED,
    params: {
      err,
    },
  }),
};
