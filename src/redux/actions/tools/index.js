import {
  FETCH_USER_BY_ADDRESS,
  FETCH_USER_BY_ADDRESS_FAILED,
  FETCH_USER_BY_ADDRESS_SUCCEED,
} from './action_types';

export default {
  onFetchUserByAddress: (params, callback) => ({
    type: FETCH_USER_BY_ADDRESS,
    params,
    callback,
  }),
  onFetchUserByAddressSucceed: (data) => ({
    type: FETCH_USER_BY_ADDRESS_SUCCEED,
    data,
  }),
  onFetchUserByAddressFailed: (err) => ({
    type: FETCH_USER_BY_ADDRESS_FAILED,
    err,
  }),
};
