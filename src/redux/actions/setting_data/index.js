import {
  FETCH_COIN_SETTING,
  FETCH_COIN_SETTING_FAILED,
  FETCH_COIN_SETTING_SUCCEED,
  FETCH_MARKET,
  FETCH_MARKET_SUCCEED,
  FETCH_MARKET_FAILED,
  FETCH_ALL_COIN,
  FETCH_ALL_COIN_SUCCEED,
  FETCH_ALL_COIN_FAILED,
  FETCH_LIMIT_WITHDRAWAL,
  FETCH_LIMIT_WITHDRAWAL_SUCCEED,
  FETCH_LIMIT_WITHDRAWAL_FAILED,
  FETCH_CRYPTO_SETTING,
  FETCH_HASH_SETTING,
  POST_COIN_SETTING,
  SELECT_COIN, SEARCH_COIN,
  UPDATE_COIN,
  FETCH_INFO_ERC20, FETCH_INFO_ERC20_FAILED, FETCH_INFO_ERC20_SUCCESS,
  CREATE_MARKET,
  CREATE_MARKET_SUCCESS,
  CREATE_MARKET_FAILED,
} from './action_types';

export default {
  fetchCoinSettingAction: (data) => ({
    type: FETCH_COIN_SETTING,
    params: {
      data,
    },
  }),
  fetchCoinSettingActionSucceed: (data) => ({
    type: FETCH_COIN_SETTING_SUCCEED,
    params: {
      data,
    },
  }),
  fetchCoinSettingActionFailed: (err) => ({
    type: FETCH_COIN_SETTING_FAILED,
    err,
  }),

  fetchMarketAction: () => ({
    type: FETCH_MARKET,
  }),
  fetchMarketActionSucceed: (data) => ({
    type: FETCH_MARKET_SUCCEED,
    params: {
      data,
    },
  }),
  fetchMarketActionFailed: (err) => ({
    type: FETCH_MARKET_FAILED,
    err,
  }),

  fetchAllCoinAction: () => ({
    type: FETCH_ALL_COIN,
  }),
  fetchAllCoinActionSucceed: (data) => ({
    type: FETCH_ALL_COIN_SUCCEED,
    params: {
      data,
    },
  }),
  fetchAllCoinActionFailed: (err) => ({
    type: FETCH_ALL_COIN_FAILED,
    err,
  }),
  fetchLimitWithdrawalAction: (data) => ({
    type: FETCH_LIMIT_WITHDRAWAL,
    params: {
      data,
    },
  }),
  fetchLimitWithdrawalSucceedAction: (data) => ({
    type: FETCH_LIMIT_WITHDRAWAL_SUCCEED,
    params: {
      data,
    },
  }),
  fetchLimitWithdrawalFailedAction: (err) => ({
    type: FETCH_LIMIT_WITHDRAWAL_FAILED,
    err,
  }),

  fetchCryptoSetting: (data_setting) => ({
    type: FETCH_CRYPTO_SETTING,
    params: {
      data_setting,
    },
  }),
  fetchHashSetting: () => ({
    type: FETCH_HASH_SETTING,
  }),
  postCoinSetting: (data) => ({
    type: POST_COIN_SETTING,
    params: {
      data,
    },
  }),

  selectCoin: (coin) => ({
    type: SELECT_COIN,
    params: {
      coin,
    },
  }),
  searchCoin: (coin) => ({
    type: SEARCH_COIN,
    params: {
      coin,
    },
  }),
  updateCoin: (coin) => ({
    type: UPDATE_COIN,
    params: {
      coin,
    },
  }),

  fetchInfoERC20Action: (params) => ({
    type: FETCH_INFO_ERC20,
    params,
  }),
  fetchInfoERC20ActionSucceed: (data) => ({
    type: FETCH_INFO_ERC20_SUCCESS,
    data,
  }),
  fetchInfoERC20ActionFailed: (err) => ({
    type: FETCH_INFO_ERC20_FAILED,
    err,
  }),

  createMarketAction: (params) => ({
    type: CREATE_MARKET,
    params,
  }),
  createMarketActionSucceed: (data) => ({
    type: CREATE_MARKET_SUCCESS,
    data,
  }),
  createMarketActionFailed: (err) => ({
    type: CREATE_MARKET_FAILED,
    err,
  }),
};
