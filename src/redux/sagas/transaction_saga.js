import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import { isFunction } from 'lodash';
import {
  FETCH_TRANS_HISTORY,
} from '../actions/transaction/action_types';
import actions from '../actions/transaction';
import rf from '../../requests/RequestFactory';
// saga effect

function* fetchTransactionHistory(action) {
  try {
    const { data, total_count: totalCount } = yield call((params) => rf.getRequest('TransactionRequest').fetchTransactionHistory(params), action.params);
    yield put(actions.fetchTransHistoryActionSucceed(data, totalCount));
    if (isFunction(action.callback)) {
      console.log('hello: ', totalCount);
      yield action.callback(totalCount);
    }
  } catch (err) {
    yield put(actions.fetchTransHistoryActionFailed(err));
  }
}

function* watchTransaction() {
  yield takeLatest(FETCH_TRANS_HISTORY, fetchTransactionHistory);
}

export default function* rootSaga() {
  yield all([fork(watchTransaction)]);
}
