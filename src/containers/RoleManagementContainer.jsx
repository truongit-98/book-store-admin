import { connect } from 'react-redux';
import actions from '../redux/actions/permission_management'
import RoleManagement from '../component/RoleManagement'

const mapStateToProps = (state) => ({
  roles: state.permission_management.roles,
  currentPermissions: state.permission_management.permissions,
  currentActions: state.permission_management.actions,
  permissionByRole:state.permission_management.permissionByRole
});

const mapDispatchToProps = (dispatch) => ({
  getRoles:() =>{
    dispatch(actions.getRoles())
  },
  addNewRole:(data, callback1, callback2)=>{
    dispatch(actions.postRole(data, callback1, callback2))
  },
  getPermission: (pos,count) =>{
    dispatch(actions.getPermission(pos,count))
  },
  getAction:(callback)=>{
    dispatch(actions.getAction(callback))
  },
  getPermissionByRole:(roleId)=>{
    dispatch(actions.getPermissionByRole(roleId))
  },
  getPermissionControlByRole:(roleId,callback)=>{
    dispatch(actions.getPermissionControlByRole(roleId,callback))
  }, 
  postPermissionsControlsForRole:(data, callback) => {
    dispatch(actions.postPermissionsControlsForRole(data,callback))
  },
  deleteRole:(roleId)=>{
    dispatch(actions.deleteRole(roleId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleManagement);
