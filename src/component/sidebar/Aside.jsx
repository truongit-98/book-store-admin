import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import { FaGithub } from "react-icons/fa";
// import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from "prop-types";
import { map } from "lodash";
import sidebarBg from "../../assets/bg1.jpg";
import routes from "../router";

const handleRoute = (authorInfo, permission_link, adminID) => {
  // if (adminID == "1") {
  //   return true
  // }
  // if (_.isEmpty(permission_link)) {
  //   return true;
  // }
  // if (!_.isEmpty(authorInfo)) {
  //   if (authorInfo.id === 1) {
  //     return true;
  //   }
  //   for (const role of authorInfo?.admin_roles) {
  //     debugger
  //     if (
  //       role.permissions
  //         ?.find((p) => p.path.includes(permission_link))
  //         ?.actions?.find((ac) => ac.action === "GET")
  //     ) {
  //       return true;
  //     }
  //   }
  //   // _.forEach(authorInfo?.admin_roles, (role) => {
  //   //   debugger;
     
  //   // });
  //   return false;
  // }
  // return false;
  return true
};

const Aside = (props) => {
  const {
    image,
    collapsed,
    rtl,
    toggled,
    handleToggleSidebar,
    handleGetTitle,
    authInfo,
    adminID,
    currentPermissions,
    currentActions,
  } = props;
  const intl = useIntl();
  const renderSideBarContent = map(routes, (route) => {
    if (handleRoute(authInfo, route.permission_link, adminID)) {
      if (route.children) {
        return (
          <Menu className="custom-menu" iconShape="circle">
            <SubMenu title={route.title} icon={route.icon()}>
              {map(route.children, (child) => {
                if (handleRoute(authInfo, child.permission_link, adminID)) {
                  return (
                    <MenuItem onClick={() => handleGetTitle(child.title)}>
                      <Link to={child.path}>{child.title}</Link>
                    </MenuItem>
                  );
                }
              })}
            </SubMenu>
          </Menu>
        );
      }
      return (
        <Menu className="custom-menu" iconShape="circle">
          <MenuItem
            onClick={() => handleGetTitle(route.title)}
            icon={route.icon()}
          >
            <Link to={route.path}>{route.title}</Link>
          </MenuItem>
        </Menu>
      );
    }
  });

  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 10,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        ></div>
      </SidebarHeader>

      <SidebarContent>{renderSideBarContent}</SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        ></div>
      </SidebarFooter>
    </ProSidebar>
  );
};

Aside.propTypes = {
  collapsed: PropTypes.bool,
  rtl: PropTypes.bool,
  image: PropTypes.bool,
  toggled: PropTypes.bool,
  handleToggleSidebar: PropTypes.func,
};

Aside.defaultProps = {
  collapsed: false,
  rtl: false,
  image: true,
  toggled: false,
  handleToggleSidebar: undefined,
};

export default Aside;
