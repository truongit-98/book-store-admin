import BaseRequest from './BaseRequest';

const schema = 'order-transaction';

export default class OrderTransactionHistoryRequest extends BaseRequest {
  fetchFilterOrderTransactionHistory(params) {
    const url = `${schema}/all`;
    return this.get(url, params);
  }

  fetchPairsOrderTransactionHistory(params) {
    const url = 'setting/coin-settings';
    return this.get(url, params);
  }
}
