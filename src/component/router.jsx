import React from 'react';
import { FaGoogleWallet, FaJediOrder, FaHome, FaUser , FaProductHunt} from 'react-icons/fa';
import { BiTransfer } from 'react-icons/bi';
import { GoBell, GoSignOut } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import OrderHistoryContainer from '../containers/OrderHistoryContainer';
import AdminManagementContainer from '../containers/AdminManagementContainer';
import PermissionManagementContainer from '../containers/PermissionManagementContainer';
import PermissionActionManagementContainer from '../containers/PermissionActionManagementContainer';
import ListUserContainer from '../containers/ListUserContainer';
import ProductManagementContainer from '../containers/ProductManagementContainer'

const routes = [
  {
    title: 'Trang chủ',
    icon: () => <FaHome />,
    path: '/',
    isExact: true,
    component: () => <div />,
  },
  {
    title: 'Quản lý đơn hàng',
    icon: () => <FaGoogleWallet />,
    children: [
      {
        title: 'Lịch sử đơn hàng',
        path: '/order-history',
        isExact: false,
        component: () => <OrderHistoryContainer />,
      }
    ],
  },

  {
    title: 'Quản lý sản phẩm',
    icon: () => <FaProductHunt />,
    path: '/list-products',
    isExact: false,
    component: () => <ProductManagementContainer />,
  },
  {
    title: 'Quản lý người dùng',
    icon: () => <GoSignOut />,
    children: [
      {
        title: 'Danh sách người dùng',
        path: '/list-user',
        permission_link: '/v1/api/account/customer',
        isExact: false,
        component: () => <ListUserContainer />,
      }
    ],
  },
  {
    title: 'Quản trị viên',
    icon: () => <FaUser />,
    children: [
      {
        title: 'Danh sách quản trị viên',
        path: '/admin-management',
        permission_link: '/v1/api/account/admins',
        isExact: false,
        component: () => <AdminManagementContainer />,
      },
      {
        title: 'Chi tiết phân quyền',
        path: '/role-management',
        permission_link: '/v1/api/authorization/roles',
        isExact: false,
        component: () => <AdminManagementContainer />,
      },
      {
        title: 'Quản lý các quyền',
        path:"/permission-management",
        permission_link: '/v1/api/authorization/permissions',

        isExact:false,
        component:()=><PermissionManagementContainer/>
      },
      {
        title:"Quản lý hành động của các quyền",
        path:"/permission-action-management",
        permission_link: '/v1/api/authorization/author-controls',
        isExact:false,
        component:()=><PermissionActionManagementContainer/>
      }
    ],
  },
];

export default routes;
