import {
  FETCH_ALL_ADMIN,
  FETCH_ALL_ADMIN_FAILED,
  FETCH_ALL_ADMIN_SUCCEED,
  ON_CREATE_ADMIN,
  ON_CREATE_ADMIN_SUCCEED,
  ON_CREATE_ADMIN_FAILED,
  FETCH_ADMIN_LOGIN_HISTORY,
  FETCH_ADMIN_LOGIN_HISTORY_SUCCEED,
  FETCH_ADMIN_LOGIN_HISTORY_FAILED,
  GET_ROLE_BY_PUBKEY,
  POST_ROLE_FOR_USER,
  FETCH_AUTH_INFO,
  FETCH_AUTH_INFO_SUCCEED,
  FETCH_AUTH_INFO_FAILED,
  GET_AUTHOR_INFO_FOR_USER,
  GET_AUTHOR_INFO_FOR_USER_SUCCESS
} from './action_types';

export default {
  onFetchAllAdmin: (data) => ({
    type: FETCH_ALL_ADMIN,
    params: {
      data,
    },
  }),
  onFetchAllAdminSucceed: (data) => ({
    type: FETCH_ALL_ADMIN_SUCCEED,
    data,
  }),
  onFetchAllAdminFailed: (err) => ({
    type: FETCH_ALL_ADMIN_FAILED,
    err,
  }),
  onCreateAdmin: (params, callback) => ({
    type: ON_CREATE_ADMIN,
    params,
    callback
  }),
  onCreateAdminSucceed: (data) => ({
    type: ON_CREATE_ADMIN_SUCCEED,
    data,
  }),
  onCreateAdminFailed: (err) => ({
    type: ON_CREATE_ADMIN_FAILED,
    err,
  }),
  onFetchAdminLoginHistory: (params) => ({
    type: FETCH_ADMIN_LOGIN_HISTORY,
    params,
  }),
  onFetchAdminLoginHistorySucceed: (data) => ({
    type: FETCH_ADMIN_LOGIN_HISTORY_SUCCEED,
    data,
  }),
  onFetchAdminLoginHistoryFailed: (err) => ({
    type: FETCH_ADMIN_LOGIN_HISTORY_FAILED,
    err,
  }),
  onFetchAuthInfo: (params) => ({
    type: FETCH_AUTH_INFO,
    params,
  }),
  userAuthorInfoAction:(params, callback) => ({
    type: GET_AUTHOR_INFO_FOR_USER,
    params,
    callback,
  }),
  userAuthorInfoActionSucceed:(data) => ({
    type: GET_AUTHOR_INFO_FOR_USER_SUCCESS,
    data,
  }),
  onFetchAuthInfoSucceed: (data) => ({
    type: GET_AUTHOR_INFO_FOR_USER_SUCCESS,
    data,
  }),
  onFetchAuthInfoFailed: (err) => ({
    type: FETCH_AUTH_INFO_FAILED,
    err,
  }),

  getRoleByPubkey: (id, callback) => ({
    type: GET_ROLE_BY_PUBKEY,
    params: {
      id,
    },
    callback,
  }),
  postRoleForUser: (body, callback) => ({
    type: POST_ROLE_FOR_USER,
    params: body,
    callback,
  }),

};
