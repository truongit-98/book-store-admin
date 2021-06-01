import UserRequest from './UserRequest';
import OrderTransactionHistoryRequest from './OrderTransactionHistoryRequest';
import OrderHistoryRequest from './OrderHistoryRequest';
import SettingRequest from './SettingRequest';
import TransactionFeeRequest from './TransactionFeeRequest';
import TransactionRequest from './TransactionRequest';
import SettingFeeTransactionRequest from './SettingFeeTransactionRequest';
import LoginRequest from './LoginRequest';
import AdminRequest from './AdminRequest';
import ToolsRequest from './ToolsRequest';
import PermissionManagementRequest from './PermissionManagementRequest';
import ProductRequest from './ProductRequest'

const requestMap = {
  UserRequest,
  AdminRequest,
  OrderTransactionHistoryRequest,
  SettingRequest,
  TransactionFeeRequest,
  OrderHistoryRequest,
  TransactionRequest,
  SettingFeeTransactionRequest,
  LoginRequest,
  ToolsRequest,
  PermissionManagementRequest,
  ProductRequest
};

const instances = {
};

export default class RequestFactory {
  static getRequest(classname) {
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }
    return requestInstance;
  }
}
