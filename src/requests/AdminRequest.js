import BaseRequest from './BaseRequest';

const schema = 'account/admins';
/**
 * key base on host:port
 */
export default class UserRequest extends BaseRequest {
  /**
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  fetchAllAdmins() {
    const url = `${schema}/`;
    return this.get(url);
  }

  /**
   * @param {Object} params
   * @param {string} params.display_name
   * @param {string} params.pubkey
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  createAdmin(params) {
    const url = `${schema}/create`;
    return this.post(url, params);
  }

  adminAuthInfo(){
    const url = `${schema}/author-info`;
    return this.get(url);
  }

  
}
