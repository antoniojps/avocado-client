import { queryCurrentTenant } from 'utilities'
import { takeEvery, put, call } from 'redux-saga/effects'
import {
  REQUEST_TENANT_LOADING, REQUEST_TENANT, REQUEST_TENANT_SUCCESS, REQUEST_TENANT_FAILURE,
} from './actions'

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

// watcher
const watchRequestTenant = function* () {
  yield takeEvery(REQUEST_TENANT, getTenant)
}

// export watcher iterators
export default [
  watchRequestTenant(),
]
