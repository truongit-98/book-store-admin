import BaseRequest from './BaseRequest';

const schema = 'authorization';

export default class PermissionManagementRequest extends BaseRequest {
  fetchPermission(params) {
    const url = `${schema}/permissions/create`;
    return this.post(url, params);
  }

  fetchGetPermissions() {
    const url = `${schema}/permissions/`;
    return this.get(url);
  }

  fetchPutPermission(params) {
    const url = `${schema}/permissions/update`;
    return this.put(url, params);
  }

  fetchGetRole(params) {
    const url = `${schema}/roles/`;
    return this.get(url, params);
  }

  fetchPostRole(params) {
    const url = `${schema}/roles/create`;
    return this.post(url, params);
  }

  fetchPostAction(params) {
    const url = `${schema}/author-controls/create`;
    return this.post(url, params);
  }

  fetchGetAction(params) {
    const url = `${schema}/author-controls/`;
    return this.get(url, params);
  }

  fetchDeleteAction(params) {
    const url = `${schema}/author-controls/delete/${params.controlId}`;
    return this.del(url);
  }

  fetchGetPermissionsByRole(params) {
    const url = `${schema}/permissions/role/${params.roleId}/`;
    return this.get(url);
  }

  fetchGetActionByRoleAndPermission(params) {
    const url = `${schema}/role-perms-controls/role/${params.roleId}/permissionId/${params.permissionId}`;
    return this.get(url);
  }

  fetchGetPermissionControlByRole(params) {
    const url = `${schema}/roles/detail/${params.roleId}/`;
    return this.get(url);
  }

  postPermissionControlForRole(params) {
    const url = `${schema}/role-permissions/create/multi`;
    return this.post(url, params);
  }

  fetchDeletePermission(params) {
    const url = `${schema}/permissions/delete/${params.permissionId}/`;
    return this.del(url);
  }

  fetchDeleteRole(params) {
    const url = `${schema}/roles/delete/${params.roleId}`;
    return this.del(url);
  }

  fetchGetRoleByPubkey(params) {
    const url = `${schema}/role-user/user/${params.id}`;
    return this.get(url);
  }

  fetchPostRoleForUser(params) {
    const url = `${schema}/role-user/multi`;
    return this.post(url, params);
  }
}
