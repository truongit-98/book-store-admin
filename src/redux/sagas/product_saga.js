import {
    put, takeLatest, call, all, fork,
  } from 'redux-saga/effects';
  import axios from 'axios';
  import qs from 'qs';
  import _ from "lodash"
  import actions from '../actions/products';
  import rf from '../../requests/RequestFactory';
  
  // saga effect
  import {
    FETCH_PRODUCTS_ACTION,
    FETCH_PRODUCT_SEARCH,
    FETCH_PRODUCTS_TYPE_ACTION,
    FETCH_PRODUCTS_TYPE_INFO_ACTION
  } from '../actions/products/action_types';
  import consts, { BASE_URL } from '../../consts';
  import utils from '../../common/utils';

  function* fetchProducts(action){
    try {
        const {data, total_count, error} = yield call((params) => rf.getRequest('ProductRequest').fetchProducts(params), action.params);
        yield put(actions.fetchProductsSucceed(data));
        if (_.isFunction(action.callback)){
          action.callback(data, total_count)
        }
    } catch (err) {
        console.log(err, 'err');
      }
  }

  function* fetchSearchProducts(action) {
    try {
      const {data} = yield call((params) => rf.getRequest('ProductRequest').searchProducts(params), action.params);
      if (_.isFunction(action.callback)) {
        yield action.callback();
      }
      yield put(actions.fetchProductsSucceed(data));
    } catch (err) {
      yield put(actions.userListActionFailed(err));
    }
  }
  
  function* fetchBookSeries(action){
    try {
        const {data} = yield call((params) => rf.getRequest('ProductRequest').fetchBookSeries());
        if (_.isFunction(action.callback)) {
          action.callback(data)
        }
        //yield put(actions.fetchProductsTypeSucceed(data));
    } catch (err) {
        console.log(err, 'err');
      }
  }

  function* fetchBookSeriesInfo(action){
    try {
        const {data} = yield call((params) => rf.getRequest('ProductRequest').fetchBookSeriesInfo(params), action.params);
        if (_.isFunction(action.callback)) {
          action.callback(data)
        }
        //yield put(actions.fetchProductsTypeSucceed(data));
    } catch (err) {
        console.log(err, 'err');
      }
  }

  
  function* watchProducts() {
    yield takeLatest(FETCH_PRODUCTS_ACTION, fetchProducts);
    yield takeLatest(FETCH_PRODUCT_SEARCH, fetchSearchProducts);
    yield takeLatest(FETCH_PRODUCTS_TYPE_ACTION, fetchBookSeries);
    yield takeLatest(FETCH_PRODUCTS_TYPE_INFO_ACTION, fetchBookSeriesInfo);

  }
  
  export default function* rootSaga() {
    yield all([fork(watchProducts)]);
  }
  