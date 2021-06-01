import { put, takeLatest, call, all, fork } from "redux-saga/effects";
import _ from "lodash";
import {
  ADD_PERMISSION,
  GET_PERMISSION,
  GET_PERMISSION_SUCCEED,
  GET_PERMISSION_FAIL,
  PUT_PERMISSION,
  GET_ROLES,
  POST_ACTION,
  GET_ACTION,
  DELETE_ACTION,
  GET_PERMISSION_BY_ROLE,
  GET_ACTION_BY_ROLE_AND_PERMISSION_SUCCEED,
  GET_PERMISSION_CONTROL_BY_ROLE,
  POST_PERMISSION_CONTROL_FOR_ROLE,
  DELETE_PERMISSION,
  DELETE_ROLE,
  GET_ROLES_SUCCEED,
  GET_ROLE_BY_PUBKEY,
  ADD_ROLE,
} from "../actions/permission_management/action_types";
import actions from "../actions/permission_management";
import rf from "../../requests/RequestFactory";
// saga effect

function* fetchAddPermission(action) {
  try {
    yield call(() =>
      rf
        .getRequest("PermissionManagementRequest")
        .fetchPermission(action.params.data)
    );
    const data = yield call(
      () =>
        rf
          .getRequest("PermissionManagementRequest")
          .fetchGetPermissions()
    );
    yield put(actions.getPermissionSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchGetPermission(action) {
  try {
    const data = yield call(
      () =>
        rf
          .getRequest("PermissionManagementRequest")
          .fetchGetPermissions()
    );
    yield put(
      actions.getPermissionSucceed(data.data, data.total_count, action.callback)
    );
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchPutPermission(action) {
  try {
    yield call(
      rf
        .getRequest("PermissionManagementRequest")
        .fetchPutPermission(action.params)
    );
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchGetRoles(action) {
  try {
    const data = yield call(() =>
      rf.getRequest("PermissionManagementRequest").fetchGetRole()
    );
    yield put(actions.getRolesSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchPostRole(action) {
  try {
    // console.log(action, "action-----------------")
    const result = yield call(() =>
      rf
        .getRequest("PermissionManagementRequest")
        .fetchPostRole({ name: action.params.roleNameReq })
    );
    const { data, error } = result;
    if (error.code === 200) {
      const body = action.params.permissionsBody;
      if (
        _.isFunction(action.callback1) &&
        _.isArray(body.permissions) &&
        body.permissions.length > 0
      ) {
        body.role_id = data.id;
        yield action.callback1(body);
      }
      if (_.isFunction(action.callback2)) {
        yield action.callback2();
      }
      yield fetchGetRoles();
    }
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchPostActions(action) {
  try {
    yield call(() =>
      rf
        .getRequest("PermissionManagementRequest")
        .fetchPostAction(action.params)
    );
    const data = yield call(() =>
      rf.getRequest("PermissionManagementRequest").fetchGetAction()
    );
    yield put(actions.getActionSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchGetActions(action) {
  try {
    const data = yield call(() =>
      rf.getRequest("PermissionManagementRequest").fetchGetAction()
    );
    yield put(actions.getActionSucceed(data.data, data.total_count));
    if (_.isFunction(action.callback)) {
      action.callback(data.data);
    }
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchDeleteActions(action) {
  try {
    yield call(() =>
      rf
        .getRequest("PermissionManagementRequest")
        .fetchDeleteAction(action.params)
    );
    const data = yield call(() =>
      rf.getRequest("PermissionManagementRequest").fetchGetAction()
    );
    yield put(actions.getActionSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchGetPermissionByRole(action) {
  try {
    console.log(action.params);
    const data = yield call(
      (params) =>
        rf
          .getRequest("PermissionManagementRequest")
          .fetchGetPermissionsByRole(params),
      action.params
    );
    yield put(actions.getPermissionByRoleSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchGetActionsByRoleAndPermission(action) {
  try {
    console.log(action.params);
    const data = yield call(
      (params) =>
        rf
          .getRequest("PermissionManagementRequest")
          .fetchGetActionByRoleAndId(params),
      action.params
    );
    yield put(
      actions.getActionByRoleAndPermissionSucceed(data.data, data.total_count)
    );
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchGetPermissionsControlsByRole(action) {
  try {
    const data = yield call(
      (params) =>
        rf
          .getRequest("PermissionManagementRequest")
          .fetchGetPermissionControlByRole(params),
      action.params
    );
    if (_.isFunction(action.callback)) {
      yield action.callback(data.data);
    }
  } catch (err) {
    console.log("err", err);
  }
}

function* postPermissionsControlsForRole(action) {
  try {
    yield call(
      (params) =>
        rf
          .getRequest("PermissionManagementRequest")
          .postPermissionControlForRole(params),
      action.params
    );
    if (_.isFunction(action.callback)) {
      yield action.callback();
    }
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchDeletePermissionSaga(action) {
  try {
    yield call(
      (params) =>
        rf
          .getRequest("PermissionManagementRequest")
          .fetchDeletePermission(params),
      action.params
    );
    const data = yield call(() =>
      rf.getRequest("PermissionManagementRequest").fetchGetPermissions()
    );
    yield put(actions.getPermissionSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* fetchDeleteRolesSaga(action) {
  try {
    yield call(
      (params) =>
        rf.getRequest("PermissionManagementRequest").fetchDeleteRole(params),
      action.params
    );
    const data = yield call(() =>
      rf.getRequest("PermissionManagementRequest").fetchGetRole()
    );
    yield put(actions.getRolesSucceed(data.data, data.total_count));
  } catch (err) {
    console.log("err", err);
  }
}

function* watchPermissionManagement() {
  yield takeLatest(ADD_PERMISSION, fetchAddPermission);
  yield takeLatest(GET_PERMISSION, fetchGetPermission);
  yield takeLatest(PUT_PERMISSION, fetchPutPermission);
  yield takeLatest(GET_ROLES, fetchGetRoles);
  yield takeLatest(POST_ACTION, fetchPostActions);
  yield takeLatest(GET_ACTION, fetchGetActions);
  yield takeLatest(DELETE_ACTION, fetchDeleteActions);
  yield takeLatest(GET_PERMISSION_BY_ROLE, fetchGetPermissionByRole);
  yield takeLatest(
    GET_ACTION_BY_ROLE_AND_PERMISSION_SUCCEED,
    fetchGetActionsByRoleAndPermission
  );
  yield takeLatest(
    GET_PERMISSION_CONTROL_BY_ROLE,
    fetchGetPermissionsControlsByRole
  );
  yield takeLatest(
    POST_PERMISSION_CONTROL_FOR_ROLE,
    postPermissionsControlsForRole
  );
  yield takeLatest(DELETE_PERMISSION, fetchDeletePermissionSaga);
  yield takeLatest(DELETE_ROLE, fetchDeleteRolesSaga);
  yield takeLatest(ADD_ROLE, fetchPostRole);
}

export default function* rootSaga() {
  yield all([fork(watchPermissionManagement)]);
}
