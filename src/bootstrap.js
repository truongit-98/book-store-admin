// boot
import axios from 'axios';
import qs from 'qs';
import _ from 'lodash';
// import './langs/i18n';
import * as yup from 'yup';
import BigNumber from 'bignumber.js';
import * as consts from './consts';
import { BASE_URL } from './consts';

BigNumber.config({
  FORMAT: {
    // string to prepend
    prefix: '',
    // decimal separator
    decimalSeparator: '.',
    // grouping separator of the integer part
    groupSeparator: ',',
    // primary grouping size of the integer part
    groupSize: 3,
    // secondary grouping size of the integer part
    secondaryGroupSize: 0,
    // grouping separator of the fraction part
    fractionGroupSeparator: ' ',
    // grouping size of the fraction part
    fractionGroupSize: 0,
    // string to append
    suffix: '',
  },
});

window.axios = axios.create({
  baseURL: BASE_URL,
  paramsSerializer(params) {
    return qs.stringify(params);
  },
});

yup.addMethod(yup.number, 'isValidBalance', (number, total, currentBalance) => number.test({
  name: 'is-valid-balance',
  message: 'Số dư không đủ để thực hiện giao dịch',
  test: () => new BigNumber(currentBalance).isGreaterThanOrEqualTo(total),
}));

window._ = _;
window.c = consts.default;
// yup.addMethod(yup.number, 'greater')
// --end boot
