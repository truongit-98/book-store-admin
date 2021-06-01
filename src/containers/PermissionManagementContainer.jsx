import { connect } from 'react-redux';
import actions from '../redux/actions/permission_management';
import PermissionManagement from '../component/PermissionManagement';

const mapStateToProps = (state) => ({
  currentPermissions: state.permission_management.permissions,
  totalPermissions: state.permission_management.permissionsTotalCount,
  groupPermissions: state.permission_management.groupPermissions,
});

const mapDispatchToProps = (dispatch) => ({
  addPermission: (data) => {
    dispatch(actions.addPermission(data));
  },
  getPermission: (pos, count, callback) => {
    dispatch(actions.getPermission(pos, count, callback));
  },
  putPermission: (name, path, permissionId) => {
    dispatch(actions.putPermission(name, path, permissionId));
  },
  deletePermission: (permissionId) => {
    dispatch(actions.deletePermission(permissionId));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionManagement);
