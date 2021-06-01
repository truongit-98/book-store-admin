import { connect } from 'react-redux';
import actions from '../redux/actions/permission_management'
import PermissionActionManagement from '../component/PermissionActionManagement'

const mapStateToProps = (state) => ({
  currentActions: state.permission_management.actions,
});

const mapDispatchToProps = (dispatch) => ({
  postAction:(action,name,description) =>{
      dispatch(actions.postAction(action,name,description))
  },
  getAction:()=>{
    dispatch(actions.getAction())
  },
  deleteAction:(id)=>{
    dispatch(actions.deleteAction(id))
  }
  
});

export default connect(mapStateToProps, mapDispatchToProps)(PermissionActionManagement);
