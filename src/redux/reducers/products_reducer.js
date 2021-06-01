import {
    reduce, flatten, forEach, isEmpty,
  } from 'lodash';
  import jwt_decode from "jwt-decode";
  import {
    FETCH_PRODUCTS_ACTION_SUCCEED,
    FETCH_PRODUCTS_TYPE_ACTION_SUCCEED
  } from '../actions/products/action_types';
  import consts from '../../consts';


  export default (
    state = {
      listProducts: [],
      series: [],
    }, action,
  ) => {
    switch (action.type) {
      // fetch order history
      case FETCH_PRODUCTS_ACTION_SUCCEED:
        const {data} = action.params
        return {
            ...state,
            listProducts: data,
          };
        case FETCH_PRODUCTS_TYPE_ACTION_SUCCEED:
          const series = action.params.data
          return {
            ...state,
            series: series,
          };
      default:
        return {
          ...state,
        };
    }
  };
  