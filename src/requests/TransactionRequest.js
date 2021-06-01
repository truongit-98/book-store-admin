import BaseRequest from './BaseRequest';

const schema = 'transaction';

export default class TransactionRequest extends BaseRequest {
  /** *
   *
   * @param {Object} params
   * @param {number} params.pos
   * @param {number} params.count
   * @param {number} params.trans_type
   * @param {number} params.trans_status
   * @param {string} params.currency
   * @param {string} params.contract
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  fetchTransactionHistory(params) {
    const url = `${schema}/history`;
    return this.get(url, params);
  }

  /** *
   *
   * @param {Object} params
   * @param {number} params.pos
   * @param {number} params.count
   * @param {string} params.address
   * @param {string} params.contract
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  fetchHistoryByAddress(params) {
    const url = `${schema}/history/address`;
    return this.get(url, params);
  }
}
