import BaseRequest from './BaseRequest';

const schema = 'orders';

export default class OrderHistoryRequest extends BaseRequest {
  fetchFilterOrderHistory(params) {
    const url = `${schema}/history`;
    return this.get(url, params);
  }

  fetchPairsOrderHistory(params) {
    const url = 'setting/coin-settings';
    return this.get(url, params);
  }
}
