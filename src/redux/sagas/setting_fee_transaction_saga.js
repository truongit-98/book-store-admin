import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import {
  FETCH_FILTER_SETTING_FEE_HISTORY,
} from '../actions/setting_fee_transaction/action_types';
import actions from '../actions/setting_fee_transaction';
import rf from '../../requests/RequestFactory';
// saga effect
import utils from '../../common/utils';

function* onUpdateSettingFee(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('SettingFeeTransactionRequest').fetchFilterSettingFee(params), action.params.data);
    if (data) {
      yield put({
        type: '@@__INIT__',
      });
    }

    yield utils.showNotification('Notification', 'Withdraw succeeded');
  } catch (err) {
    console.log('err', err);
    console.log(err.message, '@: err.message');
    yield put(actions.onUpdateSettingFeeActionFailed(err));
  }
}

function* watchAllSettingFeeTransaction() {
  yield takeLatest(FETCH_FILTER_SETTING_FEE_HISTORY, onUpdateSettingFee);
}

export default function* rootSaga() {
  yield all([fork(watchAllSettingFeeTransaction)]);
}
