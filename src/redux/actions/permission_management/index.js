import {
  ADD_PERMISSION,
  ADD_ROLE,
  DELETE_ACTION,
  DELETE_PERMISSION,
  DELETE_ROLE,
  GET_ACTION,
  GET_ACTION_BY_ROLE_AND_PERMISSION,
  GET_ACTION_BY_ROLE_AND_PERMISSION_SUCCEED,
  GET_ACTION_SUCCEED,
  GET_PERMISSION,
  GET_PERMISSION_BY_ROLE,
  GET_PERMISSION_BY_ROLE_SUCCEED,
  GET_PERMISSION_CONTROL_BY_ROLE,
  GET_PERMISSION_FAIL,
  GET_PERMISSION_SUCCEED,
  GET_ROLES,
  GET_ROLES_SUCCEED,
  POST_ACTION,
  POST_PERMISSION_CONTROL_FOR_ROLE,
  PUT_PERMISSION,
} from './action_types';

export default {
  addPermission: (data) => ({
    type: ADD_PERMISSION,
    params: {
      data,
    },
  }),
  getPermission: (pos, count, callback) => ({
    type: GET_PERMISSION,
    params: {
      pos,
      count,
    },
    callback
  }),
  getPermissionSucceed: (permissions, total_count, callback) => ({
    type: GET_PERMISSION_SUCCEED,
    params: {
      permissions,
      total_count,
    },
    callback
  }),
  getPermissionFail: () => ({
    type: GET_PERMISSION_FAIL,
  }),

  putPermission: (name, path, permission_id) => ({
    type: PUT_PERMISSION,
    params: {
      name,
      path,
      permission_id,
    },
  }),

  postRole: (data, callback1, callback2) => ({
    type: ADD_ROLE,
    params: data,
    callback1,
    callback2,
  }),

  getRoles: () => ({
    type: GET_ROLES,
  }),

  getRolesSucceed: (roles, total_count) => ({
    type: GET_ROLES_SUCCEED,
    params: {
      roles,
      total_count,
    },
  }),

  postAction: (action, name, description) => ({
    type: POST_ACTION,
    params: {
      action,
      name,
      description,
    },
  }),

  getAction: (callback) => ({
    type: GET_ACTION,
    callback,
  }),

  getActionSucceed: (actions, total_count) => ({
    type: GET_ACTION_SUCCEED,
    params: {
      actions,
      total_count,
    },
  }),

  deleteAction: (controlId) => ({
    type: DELETE_ACTION,
    params: {
      controlId,
    },
  }),

  getPermissionByRole: (roleId) => ({
    type: GET_PERMISSION_BY_ROLE,
    params: {
      roleId,
    },
  }),

  getPermissionByRoleSucceed: (data, total_count) => ({
    type: GET_PERMISSION_BY_ROLE_SUCCEED,
    params: {
      data,
      total_count,
    },
  }),

  getActionByRoleAndPermission: (roleId, permissionId) => ({
    type: GET_ACTION_BY_ROLE_AND_PERMISSION,
    params: {
      roleId,
      permissionId,
    },
  }),

  getActionByRoleAndPermissionSucceed: (data, total_count) => ({
    type: GET_ACTION_BY_ROLE_AND_PERMISSION_SUCCEED,
    params: {
      data,
      total_count,
    },
  }),

  getPermissionControlByRole: (roleId, callback) => ({
    type: GET_PERMISSION_CONTROL_BY_ROLE,
    params: {
      roleId,
    },
    callback,
  }),
  postPermissionsControlsForRole: (data, callback) => ({
    type: POST_PERMISSION_CONTROL_FOR_ROLE,
    params: data,
    callback,
  }),
  deletePermission: (permissionId) => ({
    type: DELETE_PERMISSION,
    params: {
      permissionId,
    },
  }),
  deleteRole: (roleId) => ({
    type: DELETE_ROLE,
    params: {
      roleId,
    },
  }),
};
