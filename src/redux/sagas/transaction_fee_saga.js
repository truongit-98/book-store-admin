import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import {
  UPDATE_TRANSACTION_FEE,
} from '../actions/transaction_fee/action_types';
import actions from '../actions/transaction_fee';
import rf from '../../requests/RequestFactory';
// saga effect
import utils from '../../common/utils';

function* updateLimitWithdrawal(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('TransactionFeeRequest').updateLimitWithdrawal(params), action.params.data);
    if (data) {
      yield put({
        type: '@@__INIT__',
      });
    }

    yield utils.showNotification('Notification', 'Withdraw succeeded');
  } catch (err) {
    console.log('err', err);
    console.log(err.message, '@: err.message');
    yield put(actions.onUpdateLimitWithdrawalActionFailed(err));
  }
}

function* watchAllTransactionFee() {
  yield takeLatest(UPDATE_TRANSACTION_FEE, updateLimitWithdrawal);
}

export default function* rootSaga() {
  yield all([fork(watchAllTransactionFee)]);
}
