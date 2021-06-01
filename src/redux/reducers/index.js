import { combineReducers } from 'redux';
import user from './user_reducer';
import orderTrans from './order_transaction_history_reducer';
import orderHistory from './order_history_reducer';
import setting from './setting_data_reducer';
import setting_fee_transaction from './setting_fee_transaction_reducer';
import transaction_fee from './transaction_fee_reducer';
import transaction from './transaction_reducer';
import login from './login_reducer';
import admin from './admin_reducer';
import tools from './tools_reducer';
import role from './role_reducer';
import permission_management from './permission_management_reducer'
import products from './products_reducer'
const allReducers = combineReducers({
  user,
  orderTrans,
  setting,
  setting_fee_transaction,
  transaction_fee,
  transaction,
  orderHistory,
  login,
  admin,
  role,
  permission_management,
  products
});

export default allReducers;
