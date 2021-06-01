import BaseRequest from './BaseRequest';

const schema = 'setting';
/**
 * key base on host:port
 */
export default class SettingFeeTransactionRequest extends BaseRequest {
  /**
	 *
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */
  fetchFilterSettingFee(params) {
    const url = `${schema}/update-coin-setting`;
    return this.post(url, params);
  }
}
