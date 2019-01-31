import { queryCurrentTenant } from 'utilities'
import { takeEvery, put, call } from 'redux-saga/effects'
import {
  REQUEST_TENANT_LOADING, REQUEST_TENANT, REQUEST_TENANT_SUCCESS, REQUEST_TENANT_FAILURE,
  PUT_TENANT_LOADING, PUT_TENANT, PUT_TENANT_SUCCESS, PUT_TENANT_FAILURE,
} from './actions'
import { queryPutTenant } from '../utilities/requests';

// worker
function* getTenant() {
  yield put({ type: REQUEST_TENANT_LOADING })
  try {
    const { data } = yield call(queryCurrentTenant)
    yield put({ type: REQUEST_TENANT_SUCCESS, data })
  } catch (err) {
    yield put({ type: REQUEST_TENANT_FAILURE, data: err })
  }
}

function* putTenant({ payload }) {
  yield put({ type: PUT_TENANT_LOADING });
  try {
    const { data } = yield call(queryPutTenant, payload);
    yield put({ type: PUT_TENANT_SUCCESS, data })
  } catch (err) {
    yield put({ type: PUT_TENANT_FAILURE, data: err })
  }
}

// watcher
const watchRequestTenant = function* () {
  yield takeEvery(REQUEST_TENANT, getTenant)
  yield takeEvery(PUT_TENANT, putTenant)
}

// export watcher iterators
export default [
  watchRequestTenant(),
]
