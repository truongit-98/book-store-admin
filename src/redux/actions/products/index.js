import {
  FETCH_PRODUCTS_ACTION,
  FETCH_PRODUCTS_ACTION_SUCCEED,
  FETCH_PRODUCT_SEARCH,
  FETCH_PRODUCTS_TYPE_ACTION, FETCH_PRODUCTS_TYPE_ACTION_SUCCEED,
  FETCH_PRODUCTS_TYPE_INFO_ACTION
} from './action_types';

export default {
  fetchProducts: (params, callback) => ({
    type: FETCH_PRODUCTS_ACTION,
    params,
    callback
  }),
  fetchProductsSucceed: (data) => ({
    type: FETCH_PRODUCTS_ACTION_SUCCEED,
    params: {
      data,
    },
  }),
  fetchProductSearch: (params, callback) => ({
    type: FETCH_PRODUCT_SEARCH,
    params,
    callback
  }),
  fetchProductsType: (callback) => ({
    type: FETCH_PRODUCTS_TYPE_ACTION,
    callback
  }),
  fetchProductsTypeSucceed: (data) => ({
    type: FETCH_PRODUCTS_TYPE_ACTION_SUCCEED,
    params: {
      data,
    },
  }),
  fetchProductsTypeInfo: (params, callback) => ({
    type: FETCH_PRODUCTS_TYPE_INFO_ACTION,
    params,
    callback
  }),
};
