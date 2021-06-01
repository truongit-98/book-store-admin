import BaseRequest from './BaseRequest';

const schema = 'setting';

export default class TransactionFeeRequest extends BaseRequest {
	 /**
	 *
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */

  updateLimitWithdrawal(params) {
    const url = `${schema}/update-limit-withdrawal`;
    return this.post(url, params);
  }
}
