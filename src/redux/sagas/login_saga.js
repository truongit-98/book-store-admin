import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import axios from 'axios';
import qs from 'qs';
import _ from "lodash"
import actions from '../actions/login';
import rf from '../../requests/RequestFactory';

// saga effect
import {
  REGISTER,
  WAIT_FOR_AUTH,
  LOGIN,
  LOGOUT, LOGIN_QR_2, LOGIN_QR_3, LOGIN_NORMAL,
} from '../actions/login/action_types';
import consts, { BASE_URL } from '../../consts';
import utils from '../../common/utils';

function* waitForAuth(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('LoginRequest').waitForConfirm(params), action.params.data);
    yield put(actions.waitForAuthActionSucceed(data));
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
    yield put(actions.waitForAuthActionFailed(err));
  }
}

function* register(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('LoginRequest').register(params), action.params.data);
    yield put(actions.registerSucceed(data));
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
    yield put(actions.registerFailed(err));
  }
}

function* logout(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('LoginRequest').logout(params), action.params.data);
    yield put(actions.logoutSucceed(data));
    window.localStorage.setItem('session', '');
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
    yield put(actions.logoutFailed(err));
  }
}

function* login(action) {
  try {
    console.log(action,"actim------")
    const { data, error } = yield call((params) => rf.getRequest('LoginRequest').login(params), action.params.data);
   
   console.log(data,"0---------")
    localStorage.setItem('session', JSON.stringify(data));
    yield put(actions.loginNormalSucceed(data));
    if(_.isFunction(action.callback)){
      if (error?.code !== 200){
        action.callback(false)
      } else {
        action.callback(true)

      }
    }
  } catch (err) {
    console.error(err);
    console.log(err.message, '@: err.message');
    yield put(actions.logoutFailed(err));
  }
}



function* watchAllUsers() {
  yield takeLatest(WAIT_FOR_AUTH, waitForAuth);
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGIN_NORMAL, login);

  yield takeLatest(LOGOUT, logout);
}

export default function* rootSaga() {
  yield all([fork(watchAllUsers)]);
}
