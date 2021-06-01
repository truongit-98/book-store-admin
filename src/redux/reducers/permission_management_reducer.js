import { forEach, isEmpty, sortBy, isFunction } from 'lodash';
import {
  ADD_PERMISSION,
  GET_PERMISSION_SUCCEED,
  GET_ROLES_SUCCEED,
  GET_ACTION_SUCCEED,
  GET_PERMISSION_BY_ROLE_SUCCEED,
  GET_ACTION_BY_ROLE_AND_PERMISSION_SUCCEED,
  POST_PERMISSION_CONTROL_FOR_ROLE,
} from '../actions/permission_management/action_types';
import consts from '../../consts';

export default (
  state = {
    permissions: [],
    permissionsTotalCount: 0,
    roles: [],
    rolesTotalCount: 0,
    actions: [],
    actionTotalCount: 0,
    permissionByRole: [],
    permissionByRoleTotalCount: 0,
    actionByRoleAndPermission: [],
    groupPermissions: {},
  },
  action,
) => {
  switch (action.type) {
    case GET_PERMISSION_SUCCEED:
      let permissions = [];
      const groupPermissions = {};
      action.params.permissions.map((permission, index) => {
        permissions.push({
          key: index,
          permission: permission.name,
          path: permission.path,
          action: 'default',
          id: permission.id,
          // controls for object
        });
      });
      permissions = sortBy(permissions, ['path']);
      forEach(permissions, (permission) => {
        forEach(consts.ALL_NAMESPACES, (ns) => {
          if (permission.path.includes(ns)) {
            if (isEmpty(groupPermissions[ns])) {
              groupPermissions[ns] = [];
            }
            groupPermissions[ns].push(permission);
          }
        });
      });
      if (isFunction(action.callback)){
        console.log(permissions, "permissions-------")
        action.callback(permissions)
      }
      return {
        ...state,
        permissions,
        permissionsTotalCount: action.params.total_count,
        groupPermissions,
      };

    case GET_ROLES_SUCCEED:
      const Roles = [];
      action.params.roles.map((role, index) => {
        Roles.push({
          key: index,
          role: role.name,
          amount: role.user_amount,
          action: 'default',
          id: role.id,
        });
      });

      return {
        ...state,
        roles: Roles,
        rolesTotalCount: action.params.total_count,
      };

    case GET_ACTION_SUCCEED:
      const Actions = [];
      action.params.actions.map((action, index) => {
        Actions.push({
          key: index,
          id: action.id,
          action: action.name,
          request: action.action,
          description: action.description,
          delete: 'default',
        });
      });

      return {
        ...state,
        actions: Actions,
        actionTotalCount: action.params.total_count,
      };
    case GET_PERMISSION_BY_ROLE_SUCCEED:
      return {
        ...state,
        permissionByRole: action.params.data,
        permissionByRoleTotalCount: action.params.total_count,
      };

    case GET_ACTION_BY_ROLE_AND_PERMISSION_SUCCEED:
      return {
        ...state,
        actionByRoleAndPermission: action.params.data,
      };
    case POST_PERMISSION_CONTROL_FOR_ROLE:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
