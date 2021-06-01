import {
  // FETCH_QR_CODE,
  // FETCH_QR_CODE_FAILED,
  // FETCH_QR_CODE_SUCCEED,
  WAIT_FOR_AUTH,
  WAIT_FOR_AUTH_FAILED,
  WAIT_FOR_AUTH_SUCCEED,
  REGISTER,
  REGISTER_SUCCEED,
  REGISTER_FAILED, LOGIN_NORMAL, LOGIN_NORMAL_SUCCEED, LOGIN_NORMAL_FAILED,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCEED,
  VERIFY_EMAIL_FAILED,
  LOGOUT,
  LOGOUT_SUCCEED,
  LOGOUT_FAILED,
 
} from './action_types';

export default {
  // fetchQRcodeAction: (data) => {
  // 	return {
  // 		type: FETCH_QR_CODE,
  // 		params: {
  // 			data
  // 		}
  // 	}
  // },
  // fetchQRcodeActionSucceed: (data) => {
  // 	return {
  // 		type: FETCH_QR_CODE_SUCCEED,
  // 		params: {
  // 			data
  // 		}
  // 	}
  // },
  // fetchQRcodeActionFailed: (err) => {
  // 	return {
  // 		type: FETCH_QR_CODE_FAILED,
  // 		err
  // 	}
  // },

  waitForAuthAction: (data) => ({
    type: WAIT_FOR_AUTH,
    params: {
      data,
    },
  }),
  waitForAuthActionSucceed: (data) => ({
    type: WAIT_FOR_AUTH_SUCCEED,
    params: {
      data,
    },
  }),
  waitForAuthActionFailed: (err) => ({
    type: WAIT_FOR_AUTH_FAILED,
    err,
  }),

  register: (data) => ({
    type: REGISTER,
    params: {
      data,
    },
  }),
  registerSucceed: (data) => ({
    type: REGISTER_SUCCEED,
    params: {
      data,
    },
  }),
  registerFailed: (err) => ({
    type: REGISTER_FAILED,
    err,
  }),
  loginNormal: (data, callback) => ({
    type: LOGIN_NORMAL,
    params: {
      data,
    },
    callback
  }),
  loginNormalSucceed: (data) => ({
    type: LOGIN_NORMAL_SUCCEED,
    params: {
      data,
    },
  }),
  loginNormalFailed: (err) => ({
    type: LOGIN_NORMAL_FAILED,
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

  verifyEmail: (data) => ({
    type: VERIFY_EMAIL,
    params: {
      data,
    },
  }),
  verifyEmailSucceed: (data) => ({
    type: VERIFY_EMAIL_SUCCEED,
    params: {
      data,
    },
  }),
  verifyEmailFailed: (err) => ({
    type: VERIFY_EMAIL_FAILED,
    err,
  }),
  
};
