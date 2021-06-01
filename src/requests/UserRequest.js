import BaseRequest from './BaseRequest';

const schema = 'account';
/**
 * key base on host:port
 */
export default class UserRequest extends BaseRequest {
  /**
   * @param {Object} params
   * @param {string} params.pos
   * @param {string} params.count
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  loginHistories(params) {
    const url = `${schema}/login-histories`;
    return this.get(url, params);
  }

  /**
   * @param {Object} params
   * @param {string} params.pos
   * @param {string} params.count
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  usersPaginate(params) {
    const url = `${schema}/customer`;
    return this.get(url, params);
  }

  searchUser(params) {
    const url = `${schema}/customer/search`;
    return this.get(url, params);
  }

  userInfo(params) {
    const url = `${schema}/customer/detail/${params.id}`;
    return this.get(url);
  }

  
}
