import {
  put, takeLatest, call, all, fork,
} from 'redux-saga/effects';
import {
  FETCH_USER_BY_ADDRESS,
} from '../actions/tools/action_types';
import actions from '../actions/tools';
import rf from '../../requests/RequestFactory';
// saga effect

function* fetchUserByAddress(action) {
  try {
    const { data } = yield call((params) => rf.getRequest('ToolsRequest').fetchUserByAddress(params), action.params);
    yield put(actions.onFetchUserByAddressSucceed(data));
  } catch (err) {
    yield put(actions.onFetchUserByAddressFailed(err));
  }
}

function* watchTools() {
  yield takeLatest(FETCH_USER_BY_ADDRESS, fetchUserByAddress);
}

export default function* rootSaga() {
  yield all([fork(watchTools)]);
}
