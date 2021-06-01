import {
  all, call, fork, put, takeLatest,
} from 'redux-saga/effects';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import actions from '../actions/setting_data';
import loginActions from '../actions/login';
import adminActions from '../actions/admin';
import rf from '../../requests/RequestFactory';
import {
  POST_COIN_SETTING,
} from '../actions/setting_data/action_types';
import { BASE_URL } from '../../consts';
// saga effect

function* fetchAuthIfNeed() {
  console.log('=== fetchAuthIfNeed ===');
  const strSession = window.localStorage.getItem('session');
  const session = JSON.parse(strSession || '{}');
  // check token expired
  if (!!session) {
    // add token for axios
    console.log("sessionfetchAuthIfNeed", session)
    yield put(loginActions.loginNormalSucceed(session));
    window.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        token: session.access_token,
      },
      paramsSerializer(params) {
        return qs.stringify(params);
      },
    });
    // yield put(userActions.fetchUserBalancesAction());
    // yield put(userActions.fetchUserInfoAction());
    yield put(adminActions.onFetchAuthInfo());
  }
}

function* saveMasterData() {
  console.log('=== saveMasterData ===');
  // const masterData = JSON.parse(localStorage.getItem('CRYPTO'));
  // yield put(actions.fetchAllCoinActionSucceed(masterData.coins));
  // yield put(actions.fetchCoinSettingActionSucceed(masterData.settings));
  // yield put(actions.fetchLimitWithdrawalSucceedAction(masterData.withdrawal_limits));
}


function* fetchInit() {
  try {
    // yield utils.resetCacheTimeTVChart();
    yield fetchAuthIfNeed();
  } catch (err) {
    console.log(err, 'err');
  }
}

function* postCoin(action) {
  try {
    yield rf.getRequest('SettingRequest').postCoinSetting(action.params.data);
  } catch (err) {
    console.log(err, 'err');
  }
}

function* watchInit() {
  yield takeLatest('@@__INIT__', fetchInit);
  yield takeLatest(POST_COIN_SETTING, postCoin);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
