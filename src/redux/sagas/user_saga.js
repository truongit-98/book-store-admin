import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import { isFunction } from 'lodash';
import {
  LOGIN_HISTORY, USER_INFO, USER_LIST, USER_SEARCH
} from '../actions/user/action_types';

import actions from '../actions/user';
import rf from '../../requests/RequestFactory';

// saga effect

function* fetchLoginHistory(action) {
  try {
    const resp = yield call((params) => rf.getRequest('UserRequest').loginHistories(params), action.params);

    if (isFunction(action.callback)) {
      yield action.callback(resp.total_count);
    }
    yield put(actions.loginHistoryActionSucceed(resp.data));
  } catch (err) {
    yield put(actions.loginHistoryActionFailed(err));
  }
}

function* fetchUsersPaginate(action) {
  try {
    const resp = yield call((params) => rf.getRequest('UserRequest').usersPaginate(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback(resp.data, resp.total_count);
    }
    yield put(actions.userListActionSucceed(resp.data));
  } catch (err) {
    yield put(actions.userListActionFailed(err));
  }
}

function* fetchSearchUsers(action) {
  try {
    const resp = yield call((params) => rf.getRequest('UserRequest').searchUser(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback(resp.data);
    }
    //yield put(actions.userListActionSucceed(resp.data));
  } catch (err) {
    yield put(actions.userListActionFailed(err));
  }
}

function* fetchUserInfo(action) {
  try {
    const resp = yield call((params) => rf.getRequest('UserRequest').userInfo(params), action.params);
    if (isFunction(action.callback)) {
      yield action.callback(resp.data);
    }
    yield put(actions.userInfoActionSucceed(resp.data));
  } catch (err) {
    yield console.log(err)
  }
}


function* watchAllUsers() {
  yield takeLatest(LOGIN_HISTORY, fetchLoginHistory);
  yield takeLatest(USER_LIST, fetchUsersPaginate);
  yield takeLatest(USER_SEARCH, fetchSearchUsers);
  yield takeLatest(USER_INFO, fetchUserInfo);

}

export default function* rootSaga() {
  yield all([fork(watchAllUsers)]);
}
