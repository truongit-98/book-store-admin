import React, { useState } from "react";
import { withRouter } from "react-router";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import Aside from "./Aside";
import Header from "../Header";
import ListUserContainer from "../../containers/ListUserContainer";
import ProductManagementContainer from "../../containers/ProductManagementContainer"
import OrderHistoryContainer from "../../containers/OrderHistoryContainer";
import LoginPage from "../../containers/LoginPageContainer";
import AdminManagementContainer from "../../containers/AdminManagementContainer";
import RoleManagementContainer from "../../containers/RoleManagementContainer";
import PermissionManagementContainer from "../../containers/PermissionManagementContainer";
import PermissionActionManagementContainer from "../../containers/PermissionActionManagementContainer";
import { PREFIX_FRONT_URL } from "../../consts";
import action from "../../redux/actions/login/index";

function Layout1(props) {
  const { logout } = props;
  const history = useHistory();
  window.h = history;

  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [titleHeader, setTitleHeader] = useState("");
  const [isLogin, setLogin] = useState(
    window.localStorage.getItem("session") ? true : false
  );

  history.listen((location, action) => {
    setLogin(isLogin);
  });

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleLogOut = () => {
    logout();
    window.$isAuthenticated = false;
    history.push(`${PREFIX_FRONT_URL}/login`);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const { authInfo, adminID, currentPermissions, currentActions } = props;

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <Router>
        <Aside
          authInfo={authInfo}
          adminID={adminID}
          currentPermissions={currentPermissions}
          currentActions={currentActions}
          image={image}
          collapsed={collapsed}
          handleToggleSidebar={handleToggleSidebar}
          handleGetTitle={setTitleHeader}
        />
        <Layout>
          <Header
            image={image}
            toggled={toggled}
            collapsed={collapsed}
            rtl={rtl}
            handleToggleSidebar={handleToggleSidebar}
            handleCollapsedChange={handleCollapsedChange}
            handleLogOut={handleLogOut}
            handleRtlChange={handleRtlChange}
            handleImageChange={handleImageChange}
            title={titleHeader}
          />
          <Switch>
            <Route exact path="/order-history">
              <OrderHistoryContainer />
            </Route>
            <Route exact path="/admin-management">
              <AdminManagementContainer />
            </Route>
            <Route exact path="/list-products">
              <ProductManagementContainer />
            </Route>
            <Route exact path="/list-user">
              <ListUserContainer />
            </Route>
            <Route exact path="/role-management">
              <RoleManagementContainer />
            </Route>
            <Route exact path="/permission-management">
              <PermissionManagementContainer />
            </Route>
            <Route exact path="/permission-action-management">
              <PermissionActionManagementContainer />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authInfo: state.admin.authInfo,
    adminID: state.admin.adminId,
    currentPermissions: state.permission_management.permissions,
    currentActions: state.permission_management.actions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout(params) {
    dispatch(action.logout(params));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Layout1)
);
