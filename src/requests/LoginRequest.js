import BaseRequest from './BaseRequest';

const schema = 'account/admins';
/**
 * key base on host:port
 */
export default class LoginRequest extends BaseRequest {
  /**
	 * @param {Object} params
	 * @param {string} params.step
	 * @param {string} params.code
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */
  waitForConfirm(params) {
    const url = `${schema}/confirm`;
    return this.getWithTimeout(url, params);
  }

  /**
	 * @param {Object} params
	 * @param {string} params.phone
	 * @param {string} params.password
	 * @param {string} params.term
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */
  register(params) {
    const url = `${schema}/create`;
    return this.post(url, params);
  }

  /**
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */
  logout(params) {
    const url = `${schema}/login`;
    return this.post(url, params);
  }

  /**
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */
  login(params = {}) {
    const url = `${schema}/login`;
    return this.post(url, params);
  }

}
