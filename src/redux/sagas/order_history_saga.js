import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import {
  FETCH_FILTER_ORDER_HISTORY,
  FETCH_PAIRS_ORDER_HISTORY,
} from '../actions/order_history/action_types';
import actions from '../actions/order_history/index';
import rf from '../../requests/RequestFactory';
// saga effect

function* fetchFilterOrderHistory(action) {
  try {
    const { data, total_count } = yield call((params) => rf.getRequest('OrderHistoryRequest').fetchFilterOrderHistory(params), action.params);
    yield put(actions.fetchFilterOrderHistoryActionSucceed(data, total_count));
  } catch (err) {
    console.log('err', err);
    yield put(actions.fetchFilterOrderHistoryActionFailed(err));
  }
}

function* fetchPairs(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('OrderHistoryRequest').fetchPairsOrderHistory(params), action.params);
    yield put(actions.fetchPairsOrderHistoryActionSucceed(data || []));
  } catch (err) {
    console.log('err', err);
    yield put(actions.fetchPairsOrderHistoryActionFailed(err));
  }
}

function* watchOrderHistory() {
  yield takeLatest(FETCH_FILTER_ORDER_HISTORY, fetchFilterOrderHistory);
  yield takeLatest(FETCH_PAIRS_ORDER_HISTORY, fetchPairs);
}

export default function* rootSaga() {
  yield all([fork(watchOrderHistory)]);
}
