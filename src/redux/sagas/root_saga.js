import { all } from 'redux-saga/effects';
import user from './user_saga';
import watchOrderTransactionHistory from './order_transaction_history_saga';
import watchOrderHistory from './order_history_saga';
import watchTransaction from './transaction_saga';
import watchInit from './init_saga';
import watchAllSettingFeeTransaction from './setting_fee_transaction_saga';
import watchAllTransactionFee from './transaction_fee_saga';
import watchAllUsers from './login_saga';
import watchAdmins from './admin_saga';
import watchTools from './tools_saga';
import watchSettings from './setting_saga';
import watchPermissionManagement from './permission_management_saga'
import watchProducts from './product_saga'

function* rootSaga() {
  yield all([
    user(),
    watchOrderTransactionHistory(),
    watchOrderHistory(),
    watchTransaction(),
    watchInit(),
    watchAllSettingFeeTransaction(),
    watchAllTransactionFee(),
    watchAllUsers(),
    watchAdmins(),
    watchTools(),
    watchSettings(),
    watchPermissionManagement(),
    watchProducts(),
  ]);
}

export default rootSaga;
