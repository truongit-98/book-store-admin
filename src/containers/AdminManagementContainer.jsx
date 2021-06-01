import { connect } from 'react-redux';
import AdminManagement from '../component/AdminManagement';
import actions from '../redux/actions/admin';
import actions2 from '../redux/actions/permission_management'
import actionsPermisison from '../redux/actions/permission_management'

const mapStateToProps = (state) => ({
  listAdmins: state.admin.listAdmins,
  roles: state.permission_management.roles,
  currentPermissions: state.permission_management.permissions,
  currentActions: state.permission_management.actions,
  authInfo: state.admin.authInfo,

});

const mapDispatchToProps = (dispatch) => ({
  fetchAllAdmins: (params, callback) => {
    dispatch(actions.onFetchAllAdmin(params, callback));
  },
  onCreateAdmin: (params, callback) => {
    dispatch(actions.onCreateAdmin(params, callback));
  },
  getRoleByPubkey:(id,callback)=>{
    dispatch(actions.getRoleByPubkey(id,callback))
  },
  getPermission: (pos,count) =>{
    dispatch(actions2.getPermission(pos,count))
  },
  getRoles:()=>{
    dispatch(actionsPermisison.getRoles())
  },
  postRoleForUser:(body, callback)=>{
    dispatch(actions.postRoleForUser(body, callback))
  },
  getPermissionControlByRole:(roleId,callback)=>{
    dispatch(actions2.getPermissionControlByRole(roleId,callback))
  },
  getAction:(callback)=>{
    dispatch(actions2.getAction(callback))
  },
  fetchAuthInfo:(callback)=>{
    dispatch(actions.fetchAuthInfo(callback))
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminManagement);
