import {
  WAIT_FOR_AUTH_SUCCEED,
  FETCH_QR_CODE_SUCCEED,
  LOGIN_NORMAL_SUCCEED,
  LOGIN_QR_1_SUCCEED,
  LOGIN_QR_2_SUCCEED, LOGIN_QR_2_FAILED,
  LOGOUT,
} from '../actions/login/action_types';

export default (state = {
  isLogin: {},
  // preUser: {},
  qrStep1: {},
  qrStep2: {},
  session: {},
  expired: true,
  isAuthenticated: localStorage.getItem("session")? true : false,
  // isTableLoading: false,
}, action) => {
  switch (action.type) {
    case FETCH_QR_CODE_SUCCEED:
      return {
        ...state,
        // preUser: action.data,
        // isTableLoading: false,
      };
    case WAIT_FOR_AUTH_SUCCEED:
      return {
        ...state,
        user: action.data,
        // isTableLoading: false,
      };
      case LOGIN_NORMAL_SUCCEED: {
        return {
          ...state,
          isAuthenticated: true,
        }
      }
    default:
      return {
        ...state,
      };
  }
};
