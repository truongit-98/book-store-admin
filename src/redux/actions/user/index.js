import {
  // FETCH_QR_CODE,
  // FETCH_QR_CODE_FAILED,
  // FETCH_QR_CODE_SUCCEED,
  LOGIN_HISTORY,
  LOGIN_HISTORY_FAILED,
  LOGIN_HISTORY_SUCCEED,
  USER_LIST,
  USER_LIST_SUCCEED,
  USER_LIST_FAILED,
  LOGOUT,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
  USER_SEARCH,
  USER_INFO,
  USER_INFO_SUCCEED,
  GET_AUTHOR_INFO_FOR_USER,
  GET_AUTHOR_INFO_FOR_USER_SUCCESS,
} from './action_types';

export default {
  loginHistoryAction: (params, callback) => ({
    type: LOGIN_HISTORY,
    params,
    callback,
  }),
  loginHistoryActionSucceed: (data) => ({
    type: LOGIN_HISTORY_SUCCEED,
    data,
  }),
  loginHistoryActionFailed: (err) => ({
    type: LOGIN_HISTORY_FAILED,
    err,
  }),
  userListAction: (params, callback) => ({
    type: USER_LIST,
    params,
    callback,
  }),
  userSearchAction: (params, callback) => ({
    type: USER_SEARCH,
    params,
    callback,
  }),
  userInfoAction:(params, callback) => ({
    type: USER_INFO,
    params,
    callback,
  }),
  userInfoActionSucceed:(data) => ({
    type: USER_INFO_SUCCEED,
    data,
  }),
  userListActionSucceed: (data) => ({
    type: USER_LIST_SUCCEED,
    data,
  }),
  userListActionFailed: (err) => ({
    type: USER_LIST_FAILED,
    err,
  }),
  logout: (data) => ({
    type: LOGOUT,
    params: {
      data,
    },
  }),
  logoutSucceed: (data) => ({
    type: LOGOUT_SUCCEED,
    params: {
      data,
    },
  }),
  logoutFailed: (err) => ({
    type: LOGOUT_FAILED,
    err,
  }),
};
