import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import {
  FETCH_FILTER_ORDER_TRANSACTION_HISTORY,
  FETCH_PAIRS_ORDER_TRANSACTION_HISTORY,
} from '../actions/order_transaction_history/action_types';
import actions from '../actions/order_transaction_history';
import rf from '../../requests/RequestFactory';
// saga effect

function* fetchFilterOrderTransaction(action) {
  try {
    const { data, total_count } = yield call((params) => rf.getRequest('OrderTransactionHistoryRequest').fetchFilterOrderTransactionHistory(params), action.params);
    yield put(actions.fetchFilterTransactionHistoryActionSucced(data, total_count));
  } catch (err) {
    console.log('err', err);
    yield put(actions.fetchFilterTransactionHistoryActionFailed(err));
  }
}

function* fetchPairsOrderTransactionHistory(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('OrderTransactionHistoryRequest').fetchPairsOrderTransactionHistory(params), action.params);
    yield put(actions.fetchPairsOrderTransactionHistoryActionSucceed(data));
  } catch (err) {
    console.log('err', err);
    yield put(actions.fetchPairsOrderTransactionHistoryActionFailed(err));
  }
}

function* watchOrderTransactionHistory() {
  yield takeLatest(FETCH_FILTER_ORDER_TRANSACTION_HISTORY, fetchFilterOrderTransaction);
  yield takeLatest(FETCH_PAIRS_ORDER_TRANSACTION_HISTORY, fetchPairsOrderTransactionHistory);
}

export default function* rootSaga() {
  yield all([fork(watchOrderTransactionHistory)]);
}
