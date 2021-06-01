import {
  LOGIN_HISTORY_SUCCEED,
  USER_LIST_SUCCEED,
  USER_SEARCH,
  USER_INFO_SUCCEED,
} from "../actions/user/action_types";
import {
  LOGIN_NORMAL_SUCCEED,
} from "../actions/login/action_types";
import utils from "../../common/utils";

export default (
  state = {
    loginHistories: [],
    info: {},
    isAuthenticated: localStorage.getItem("session")? true : false,
    authorData: {}
  },
  action
) => {
  switch (action.type) {
    case LOGIN_HISTORY_SUCCEED:
      const loginHistories = window._.map(action.data, (loginHistory) => {
        loginHistory.key = loginHistory.created_at;
        loginHistory.created_at = utils.formatTimeFromUnix(
          loginHistory.created_at,
          "DD/MM/YYYY HH:mm:ss"
        );
        return loginHistory;
      });
      return {
        ...state,
        loginHistories,
      };
    case LOGIN_NORMAL_SUCCEED:
      window.$isAuthenticated = true;
      return {
        ...state,
        session: action.params.data,
        isAuthenticated: true,
      };
    case USER_LIST_SUCCEED:
      const users = window._.map(action.data, (user) => {
        user.key = user.created_at;
        user.registration_date = utils.formatTimeFromUnix(
          user.registration_date,
          "DD/MM/YYYY HH:mm:ss"
        );
        return user;
      });
      return {
        ...state,
        users,
      };
    case USER_SEARCH:
      return {
        ...state,
        users: action.data,
      };
    case USER_INFO_SUCCEED:
      return {
        ...state,
        info: action.data,
      };
      
    default:
      return {
        ...state,
      };
  }
};
