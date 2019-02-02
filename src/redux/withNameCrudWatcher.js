import { call, put, takeEvery } from 'redux-saga/effects';


function* fetch({
  payload, callFunction, counterName,
}) {
  yield put({ type: `FETCH_${counterName}_LOADING` })
  try {
    const { data } = yield call(callFunction, payload)
    yield put({ type: `FETCH_${counterName}_SUCCESS`, data })
  } catch (err) {
    yield put({ type: `FETCH_${counterName}_FAILURE`, data: err })
  }
}

const watchRequestTenant = function* (counterName) {
  yield takeEvery(`FETCH_${counterName}`, fetch)
}

export default (counterName = '') => [
  watchRequestTenant(counterName),
]
