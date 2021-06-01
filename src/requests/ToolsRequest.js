import BaseRequest from './BaseRequest';

const schema = 'tools';
/**
 * key base on host:port
 */
export default class ToolsRequest extends BaseRequest {
  /**
   * @param {Object} params
   * @param {string} params.address
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  fetchUserByAddress(params) {
    const url = `${schema}/user-by-address`;
    return this.get(url, params);
  }
}
