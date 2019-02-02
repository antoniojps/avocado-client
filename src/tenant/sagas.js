import {
  queryCurrentTenant, queryCurrentTenantRoles, queryPutTenant, queryPutRole,
} from 'utilities'
import { takeEvery, put, call } from 'redux-saga/effects'
import {
  REQUEST_TENANT_LOADING, REQUEST_TENANT, REQUEST_TENANT_SUCCESS, REQUEST_TENANT_FAILURE,
  REQUEST_ROLES_LOADING, REQUEST_ROLES, REQUEST_ROLES_SUCCESS, REQUEST_ROLES_FAILURE,
  PUT_TENANT_LOADING, PUT_TENANT, PUT_TENANT_SUCCESS, PUT_TENANT_FAILURE,
  PUT_ROLE_LOADING, PUT_ROLE, PUT_ROLE_SUCCESS, PUT_ROLE_FAILURE,
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
function* getRoles() {
  yield put({ type: REQUEST_ROLES_LOADING })
  try {
    const { data } = yield call(queryCurrentTenantRoles)
    yield put({ type: REQUEST_ROLES_SUCCESS, data })
  } catch (err) {
    yield put({ type: REQUEST_ROLES_FAILURE, data: err })
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
function* putRole({ payload: { id, permissions } }) {
  yield put({ type: PUT_ROLE_LOADING });
  try {
    const { data } = yield call(queryPutRole, { id, permissions });
    yield put({ type: PUT_ROLE_SUCCESS, data })
  } catch (err) {
    yield put({ type: PUT_ROLE_FAILURE, data: err })
  }
}

// watcher
const watchRequestTenant = function* () {
  yield takeEvery(REQUEST_TENANT, getTenant)
  yield takeEvery(PUT_TENANT, putTenant)
  yield takeEvery(REQUEST_ROLES, getRoles)
  yield takeEvery(PUT_ROLE, putRole)
}

// export watcher iterators
export default [
  watchRequestTenant(),
]
