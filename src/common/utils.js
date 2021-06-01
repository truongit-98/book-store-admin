import { notification } from 'antd';
import { unix } from 'moment';
import _ from 'lodash';
import sha1 from 'js-sha1';
import XLSX from 'xlsx';
import BigNumber from 'bignumber.js';
import consts from '../consts';
import { func } from 'prop-types';

const Hash = require('eth-lib/lib/hash');
const BN = require('bn.js');

const showNotification = (message = 'title', description = 'description', type = 'success') => {
  notification[type]({
    message,
    description,
    duration: 10
  });
};

const formatCurrency = (currency) => trimRightZeroAndDot(new BigNumber(currency).toFormat(8));

const convert_aobj2aoa = (aobj) => window._.map(aobj,
  (obj) => window._.reduce(obj, (result, v, _) => [...result, v], []));

const addHeader = (data, header) => {
  // header = header.map(col => window._.startCase(window._.toLower(col)));
  data.unshift(header);
  return data;
};

const trimAll = (obj) => {
  if (window._.isArray(obj)) {
    console.log('please pass object here! src/common/utils.js:29');
    return;
  }

  window._.forEach(obj, (value, key) => {
    if (typeof obj[`${key}`] === 'object') {
      trimAll(obj[`${key}`]);
    } else {
      if (key !== `${key}`.trim()) {
        delete obj[`${key}`];
        key = `${key}`.trim();
      }
      if (typeof value === 'string') {
        obj[`${key}`] = window._.trim(value);
      }
    }
  });
};

const paddingZeros = (num, count = 19) => ('0'.repeat(count) + num).substr(-count, count);
const trimRightZero = (num) => (`${num}`.split('.').length === 2 ? window._.trimEnd(num, '0') : `${num}`);
const trimDot = (num) => window._.trimEnd(`${num}`, '.');
const trimRightZeroAndDot = (num) => trimDot(trimRightZero(num));
const isBuyOrder = (tradeType) => consts.ORDER_TRADE_TYPE_BUY === tradeType;
const isSellOrder = (tradeType) => consts.ORDER_TRADE_TYPE_SELL === tradeType;

// Loai lenh
const parseOrderType = (type) => {
  switch (type) {
    case consts.ORDER_TYPE_LIMIT:
      return 'Giới hạn';
    case consts.ORDER_TYPE_MARKET:
      return 'Thị trường';
    case consts.ORDER_TYPE_STOP_LIMIT:
      return 'Giới hạn dừng';
    case consts.ORDER_TYPE_STOP_MARKET:
      return 'Stop Market';
    default:
      return '';
  }
};

const parseTradeType = (type) => {
  switch (type) {
    case consts.ORDER_TRADE_TYPE_BUY:
      return 'Mua';
    case consts.ORDER_TRADE_TYPE_SELL:
      return 'Bán';
    default:
      return '';
  }
};

const parseTransType = (type) => {
  switch (type) {
    case consts.TRANSACTION_TYPE_DEPOSIT:
      return 'Nạp';
    case consts.TRANSACTION_TYPE_WITHDRAW:
      return 'Rút';
    default:
      return 'Nạp';
  }
};

const parseTranStatus = (type) => {
  switch (type) {
    case consts.TRANSACTION_STATUS_SUCCESS:
      return 'Thành công';
    case consts.TRANSACTION_STATUS_PENDING:
      return 'Đang chờ xử lý';
    case consts.TRANSACTION_STATUS_SUBMITTED:
      return consts.TRANSACTION_STATUS_SUBMITTED_STR;
    case consts.TRANSACTION_STATUS_ERROR:
      return 'Lỗi';
    case consts.TRANSACTION_STATUS_CANCEL:
      return 'Đã hủy';
    case consts.TRANSACTION_STATUS_REJECTED:
      return consts.TRANSACTION_STATUS_CANCEL_STR;
    default:
      return '';
  }
};

const parseOrderStatus = (type) => {
  switch (type) {
    case consts.ORDER_STATUS_STOPPING:
      return 'Đang dừng';
    case consts.ORDER_STATUS_PENDING:
      return 'Đang chờ xử lý';
    case consts.ORDER_STATUS_EXECUTED:
      return 'Đã khớp';
    case consts.ORDER_STATUS_CANCELED:
      return 'Đã hủy';
    case consts.ORDER_STATUS_EXECUTING:
      return 'Đang thực thi';
    default:
      return '';
  }
};

function hash(object) {
  return sha1(JSON.stringify(object));
}

function getCoinName(coins, symbol) {
  return window._.find(coins, ['symbol', symbol]);
}

function resetCacheTimeTVChart() {
  sessionStorage.setItem('currentTimeRequest', '');
  sessionStorage.setItem('previousTimeRequest', '');
}

function upperCaseFirst(input) {
  return window._.upperFirst(input);
}

// base on web3js
/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
function isAddress(address) {
  // check if it has the basic requirements of an address
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
    // If it's ALL lowercase or ALL upppercase
  } if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
    return true;
    // Otherwise check each case
  }
  return checkAddressChecksum(address);
}

/**
 * Checks if the given string is a checksummed address
 *
 * @method checkAddressChecksum
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
var checkAddressChecksum = function (address) {
  // Check each case
  address = address.replace(/^0x/i, '');
  const addressHash = sha3(address.toLowerCase()).replace(/^0x/i, '');

  for (let i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false;
    }
  }
  return true;
};

/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
const isHexStrict = function (hex) {
  return ((_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex));
};

/**
 * Convert a hex string to a byte array
 *
 * Note: Implementation from crypto-js
 *
 * @method hexToBytes
 * @param {string} hex
 * @return {Array} the byte array
 */
const hexToBytes = function (hex) {
  let truncateHex = hex.toString(16);

  if (!isHexStrict(hex)) {
    throw new Error(`Given value "${hex}" is not a valid hex string.`);
  }

  truncateHex = truncateHex.replace(/^0x/i, '');
  const bytes = [];
  for (let c = 0; c < truncateHex.length; c += 2) {
    bytes.push(parseInt(truncateHex.substr(c, 2), 16));
  }

  return bytes;
};

/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
const isBN = function (object) {
  return BN.isBN(object);
};

/**
 * Hashes values to a sha3 hash using keccak 256
 *
 * To hash a HEX string the hex must have 0x in front.
 *
 * @method sha3
 * @return {String} the sha3 string
 */
const SHA3_NULL_S = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';

let sha3 = function (value) {
  if (isBN(value)) {
    value = value.toString();
  }

  if (isHexStrict(value) && /^0x/i.test((value).toString())) {
    value = hexToBytes(value);
  }

  const returnValue = Hash.keccak256(value); // jshint ignore:line

  if (returnValue === SHA3_NULL_S) {
    return null;
  }
  return returnValue;
};

export default {
  isAddress,
  resetCacheTimeTVChart,
  parseTradeType,
  parseTranStatus,
  getCoinName,
  parseTransType,
  isBuyOrder,
  isSellOrder,
  hash,
  trimAll,
  showNotification,
  paddingZeros,
  trimRightZero,
  trimRightZeroAndDot,
  parseOrderType,
  parseOrderStatus,
  upperCaseFirst,
  formatCurrency,
  formatTimeFromUnix: (unixTime, format = 'DD/MM/YYYY') => unix(parseInt(`${unixTime}`.substr(0, 10))).format(format),
  handleExport: (data, nameFile = 'test', extension = 'csv') => {
    if (data.length === 0) {
      showNotification('Notification', 'Please select at least one config before export', consts.TYPE_WARNING);
      return;
    }
    const dataConverted = convert_aobj2aoa([...data]);
    const dataConvertedWithHeader = addHeader(dataConverted, [...Object.keys(data[0])]);
    const workSheet = XLSX.utils.aoa_to_sheet(dataConvertedWithHeader);
    const bookNew = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(bookNew, workSheet, nameFile);
    XLSX.writeFile(bookNew, `${nameFile}.${extension}`);
  },
};

//fomart currency
export function formatCurrency2(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "." + "$2");
  }
  return val;
}

export function handleVietNamemese(str){
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str
}
