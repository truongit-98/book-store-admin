import { FETCH_USER_BY_ADDRESS_SUCCEED } from '../actions/tools/action_types';

export default (
  state = {
    userInfo: {},
  }, action,
) => {
  switch (action.type) {
    // fetch order history
    case FETCH_USER_BY_ADDRESS_SUCCEED:
      return {
        ...state,
        userInfo: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
