import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import { CREATE_MARKET, FETCH_INFO_ERC20 } from '../actions/setting_data/action_types';
import settingAction from '../actions/setting_data';
import rf from '../../requests/RequestFactory';

// saga effect

function* fetchToken(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('SettingRequest').getToken(params), action.params);
    yield put(settingAction.fetchInfoERC20ActionSucceed(data));
  } catch (err) {
    yield put(settingAction.fetchInfoERC20ActionFailed(err));
  }
}

function* createMarket(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('SettingRequest').createMarket(params), action.params);
    yield put(settingAction.createMarketActionSucceed(data));
    yield put({
      type: '@@__INIT__',
    });
  } catch (err) {
    yield put(settingAction.createMarketActionFailed(err));
  }
}

function* watchSettings() {
  yield takeLatest(FETCH_INFO_ERC20, fetchToken);
  yield takeLatest(CREATE_MARKET, createMarket);
}

export default function* rootSaga() {
  yield all([fork(watchSettings)]);
}
