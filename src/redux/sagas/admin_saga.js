import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import {
  FETCH_ADMIN_LOGIN_HISTORY,
  FETCH_ALL_ADMIN,
  ON_CREATE_ADMIN,
  GET_ROLE_BY_PUBKEY,
  POST_ROLE_FOR_USER, FETCH_AUTH_INFO,
  GET_AUTHOR_INFO_FOR_USER,
  GET_AUTHOR_INFO_FOR_USER_SUCCESS
} from '../actions/admin/action_types';
import actions from '../actions/admin';
import rf from '../../requests/RequestFactory';
import { GET_ACTION_SUCCEED } from '../actions/permission_management/action_types';

function* fetchAllAdmins(action) {
  try {
    const { data } = yield call(
      (params) => rf.getRequest('AdminRequest').fetchAllAdmins(params),
      action.params,
    );
    yield put(actions.onFetchAllAdminSucceed(data));

  } catch (err) {
    console.log(err, 'err');
    yield put(actions.onFetchAllAdminFailed(err));
  }
}

function* fetchAdminLoginHistory(action) {
  try {
    const { data } = yield call(
      (params) => rf.getRequest('AdminRequest').fetchAdminLoginHistory(params),
      action.params,
    );
    yield put(actions.onFetchAdminLoginHistorySucceed(data));
  } catch (err) {
    yield put(actions.onFetchAdminLoginHistoryFailed(err));
  }
}

function* createAdmin(action) {
  try {
    yield call(
      (params) => rf.getRequest('AdminRequest').createAdmin(params),
      action.params,
    );
    if (_.isFunction(action.callback)){
      action.callback()
    }
    yield put(actions.onFetchAllAdmin());
  } catch (err) {
    console.log(err, 'err');
    yield put(actions.onFetchAllAdminFailed(err));
  }
}

function* fetchGetRoleByPubkey(action) {
  try {
    const data = yield call(
      (params) => rf
        .getRequest('PermissionManagementRequest')
        .fetchGetRoleByPubkey(params),
      action.params,
    );
    if (_.isFunction(action.callback)) {
      yield action.callback(action.params.id, data.data);
    }
    // yield put(actions.getRolesSucceed(data.data,data.total_count));
  } catch (err) {
    console.log('err', err);
  }
}

function* fetchPostRoleForUserSaga(action) {
  try {
    yield call(() => rf
      .getRequest('PermissionManagementRequest')
      .fetchPostRoleForUser(action.params));
    if (_.isFunction(action.callback)) {
      yield action.callback();
    }
  } catch (err) {
    console.log('err', err);
  }
}

function* fetchAuthInfo(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('AdminRequest').adminAuthInfo(params), action.params);
    yield put(actions.onFetchAuthInfoSucceed(data));
  } catch (err) {
    console.log(err, 'err');
    yield put(actions.onFetchAuthInfoFailed(err));
  }
}


// function* fetchAuthorInfo(action) {
//   try {
//     const resp = yield call((params) => rf.getRequest('AdminRequest').fetchAuthorInfo());
//     if (isFunction(action.callback)) {
//       yield action.callback(resp.data);
//     }
//     yield put(actions.fet(resp.data));
//   } catch (err) {
//     yield console.log(err)
//   }
// }


function* watchAdmins() {
  yield takeLatest(FETCH_ALL_ADMIN, fetchAllAdmins);
  yield takeLatest(FETCH_ADMIN_LOGIN_HISTORY, fetchAdminLoginHistory);
  yield takeLatest(ON_CREATE_ADMIN, createAdmin);
  yield takeLatest(GET_ROLE_BY_PUBKEY, fetchGetRoleByPubkey);
  yield takeLatest(POST_ROLE_FOR_USER, fetchPostRoleForUserSaga);
  yield takeLatest(GET_AUTHOR_INFO_FOR_USER, fetchAuthInfo);
}

export default function* rootSaga() {
  yield all([fork(watchAdmins)]);
}
