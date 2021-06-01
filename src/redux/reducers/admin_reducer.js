import {
  reduce, flatten, forEach, isEmpty,
} from 'lodash';
import jwt_decode from "jwt-decode";
import {
  FETCH_ALL_ADMIN_SUCCEED,
  FETCH_ADMIN_LOGIN_HISTORY_SUCCEED,
  FETCH_AUTH_INFO_SUCCEED,
  GET_AUTHOR_INFO_FOR_USER_SUCCESS,
} from '../actions/admin/action_types';
import consts from '../../consts';

function decodeSession() {
  const session = localStorage.getItem("session")
  if (session) {
    console.log("session", JSON.parse(session))
    const decoded = jwt_decode(JSON.parse(session)["access_token"]);
    console.log(decoded, "decoded")    
    return decoded.user
  }
  return null
}

export default (
  state = {
    listAdmins: [],
    loginHistories: [],
    authInfo: {},
    permissions: [],
    mapPermissions: {},
    adminId: decodeSession(),
  }, action,
) => {
  switch (action.type) {
    // fetch order history
    case FETCH_ALL_ADMIN_SUCCEED:
      action.data.map((data,index)=>{
        data.key=index
      })
      return {
        ...state,
        listAdmins: action.data,
      };
    case FETCH_ADMIN_LOGIN_HISTORY_SUCCEED:
      return {
        ...state,
        loginHistories: action.data,
      };
    case GET_AUTHOR_INFO_FOR_USER_SUCCESS:
      const allRoles = reduce(action.data.roles || [], (allRoles, role, _) => [...allRoles, role], []);
      const allPermissions = reduce(allRoles, (allPermissions, { permissions }, _) => [...allPermissions, ...permissions], []);
      let mapPermissions = {};
      
      // add map control for easy to use
      forEach(allPermissions, (permission) => {
        forEach(permission.controls, (control) => {
          if (!permission.mapControls) {
            permission.mapControls = {};
          }
          permission.mapControls[control.action] = control;
          mapPermissions[permission.permission_link] = permission;
        });
      });

      return {
        ...state,
        authInfo: action.data,
        permissions: allPermissions,
        mapPermissions,
      };
    default:
      return {
        ...state,
      };
  }
};
