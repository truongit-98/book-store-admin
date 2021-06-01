import _ from 'lodash';
import { FETCH_TRANS_HISTORY_SUCCEED } from '../actions/transaction/action_types';
import utils from '../../common/utils';

export default (
  state = {
    trans: [],
  }, action,
) => {
  switch (action.type) {
    // fetch order history
    case FETCH_TRANS_HISTORY_SUCCEED:
      _.forEach(action.data, (trans) => {
        trans.created_at = utils.formatTimeFromUnix(trans.created_at, 'DD/MM/YYYY HH:mm');
        trans.amount = utils.formatCurrency(trans.amount);
        trans.fee = utils.formatCurrency(trans.fee);
        trans.status = utils.parseTranStatus(trans.status);
      });

      return {
        ...state,
        trans: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
