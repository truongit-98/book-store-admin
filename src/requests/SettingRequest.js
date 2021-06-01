import BaseRequest from './BaseRequest';

const schema = 'setting';
/**
 * key base on host:port
 */
export default class SettingRequest extends BaseRequest {
	version = "v1/cryptotrading-admin";

  /**
	 *
	 * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
	 */
  fetchCoinSettings() {
    const url = `${schema}/coin-settings`;
    return this.get(url);
  }

  fetchMarkets() {
    const url = `${schema}/markets`;
    return this.get(url);
  }

  fetchAllCoins() {
    const url = `${schema}/coins`;
    return this.get(url);
  }

  fetchLimitWithdrawal() {
    const url = `${schema}/limit-withdrawals`;
    return this.get(url);
  }
  UpdateLimitWithdrawal() {
    const url = `${schema}/update-limit-withdrawal    `;
    return this.post(url);
  }

  fetchCryptoSetting() {
    const url = `${schema}/crypto-setting`;
    return this.get(url);
  }

  fetchSettingHash() {
    const url = `${schema}/setting-hash`;
    return this.get(url);
  }

  postCoinSetting(data){
    const url = `${schema}/coins?fbclid=IwAR0LORHbo72pwsYRb2DCwhU_lJ_xJi46t0SqbNvBsKcyROvo42yrNfqODrQ`
    return this.post(url,data);
  }
  
  getToken(params){
    const url = `${schema}/token`
    return this.get(url, params);
  }

  createMarket(params) {
    const url = `${schema}/coin-setting`;
    return this.post(url, params);
  }
}
