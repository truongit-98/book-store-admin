import {
  FETCH_TRANS_HISTORY,
  FETCH_TRANS_HISTORY_SUCCEED,
  FETCH_TRANS_HISTORY_FAILED,
} from './action_types';

export default {
  fetchTransHistoryAction: (params, callback) => ({
    type: FETCH_TRANS_HISTORY,
    params,
    callback,
  }),

  fetchTransHistoryActionSucceed: (data, totalCount, callback) => ({
    type: FETCH_TRANS_HISTORY_SUCCEED,
    data,
    callback,
  }),

  fetchTransHistoryActionFailed: (err) => ({
    type: FETCH_TRANS_HISTORY_FAILED,
    err,
  }),
};
