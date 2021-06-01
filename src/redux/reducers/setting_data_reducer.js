import _ from 'lodash';
import {
  FETCH_COIN_SETTING_SUCCEED,
  FETCH_MARKET,
  FETCH_MARKET_SUCCEED,
  FETCH_MARKET_FAILED,
  FETCH_ALL_COIN_SUCCEED,
  FETCH_LIMIT_WITHDRAWAL_SUCCEED,
  POST_COIN_SETTING, SELECT_COIN, SEARCH_COIN, UPDATE_COIN,
  FETCH_INFO_ERC20_SUCCESS,
} from '../actions/setting_data/action_types';
import utils from '../../common/utils';

export default (state = {
  coinSettings: [],
  currencyMarkets: {},
  coins: [],
  arrCoins: [],
  limitWithdrawals: [],
  objCoinSettings: {},
  dataTableCoin: [],
  selectionCoin: [],
  erc20TokenInfo: {},
}, action) => {
  switch (action.type) {
    case FETCH_COIN_SETTING_SUCCEED:
      window._.forEach(action.params.data, (item) => {
        item.pair = `${item.coin}/${item.currency}`;
        item.fee = utils.formatCurrency(item.fee);
        item.minimum_amount = utils.formatCurrency(item.minimum_amount);
        item.minimum_quantity = utils.formatCurrency(item.minimum_quantity);
        item.precision = (utils.formatCurrency(item.precision).match(new RegExp('0', 'g')) || []).length;
        item.minimum_quantity_precision = (utils.formatCurrency(item.minimum_quantity_precision).match(new RegExp('0', 'g')) || []).length;
        item.minimum_amount_precision = (utils.formatCurrency(item.minimum_amount_precision).match(new RegExp('0', 'g')) || []).length;
      });
      const objCoinSettings = window._.reduce(action.params.data, (result, item, index) => {
        result[item.pair] = item;
        result[item.pair].key = index;
        return result;
      }, {});
      return {
        ...state,
        coinSettings: action.params.data,
        objCoinSettings,
      };

    case FETCH_ALL_COIN_SUCCEED:
      const coins = window._.reduce(action.params.data, (result, item, index) => {
        result[item.coin] = item;
        result[item.coin].key = index;
        return result;
      }, {});
      return {
        ...state,
        coins,
        arrCoins: _.values(coins),
        selectionCoin: _.values(coins),
      };

    case FETCH_MARKET:
      return {
        ...state,
      };
    case FETCH_MARKET_SUCCEED:
      const currencyMarkets = window._.reduce(action.params.data, (result, item, market) => {
        const pair = `${market}`.split(':');
        const coin = pair[0];
        const currency = pair[1];

        if (window._.isEmpty(result[currency])) {
          result[currency] = [];
        }

        item.coin = coin;
        item.currency = currency;
        result[currency].push(item);

        return result;
      }, {});

      return {
        ...state,
        currencyMarkets,
      };
    case FETCH_MARKET_FAILED:
      return {
        ...state,
      };
    case FETCH_LIMIT_WITHDRAWAL_SUCCEED:
      return {
        ...state,
        limitWithdrawals: window._.keyBy(action.params.data, ({ currency, security_level }) => `${currency}:${security_level}`),
      };
    case SELECT_COIN:
      let selectionCoinFake = state.arrCoins.slice();
      if (action.params.coin !== '') {
        selectionCoinFake = _.remove(selectionCoinFake, (n) => n.coin === action.params.coin);
      }
      return {
        ...state,
        selectionCoin: selectionCoinFake,
      };
    case SEARCH_COIN:
      let searchCoin = state.arrCoins.slice();
      if (action.params.coin !== '') {
        searchCoin = _.remove(searchCoin, (n) => { if (n.coin.indexOf(action.params.coin) === 0) { return true; } return false; });
      }
      return {
        ...state,
        selectionCoin: searchCoin,
      };
    case FETCH_INFO_ERC20_SUCCESS:
      return {
        ...state,
        erc20TokenInfo: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
