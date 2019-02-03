import { call, put, takeEvery } from 'redux-saga/effects';

function* fetch({
  payload, callFunction, context,
}) {
  yield put({ type: `FETCH_${context}_LOADING` })
  try {
    const { data } = yield call(callFunction, payload)
    yield put({ type: `FETCH_${context}_SUCCESS`, data })
  } catch (err) {
    yield put({ type: `FETCH_${context}_FAILURE`, data: err })
  }
}

function* post({ payload, callFunction, context }) {
  yield put({ type: `POST_${context}_LOADING` });
  try {
    const { data: { data } } = yield call(callFunction, payload);
    yield put({ type: `POST_${context}_SUCCESS`, data })
  } catch (err) {
    yield put({ type: `POST_${context}_FAILURE`, data: err })
  }
}

function* update({ payload, callFunction, context }) {
  yield put({ type: `PUT_${context}_LOADING` });
  try {
    const { data: { data } } = yield call(callFunction, payload);
    yield put({ type: `PUT_${context}_SUCCESS`, data })
  } catch (err) {
    yield put({ type: `PUT_${context}_FAILURE`, data: err })
  }
}

function* destroy({ payload, callFunction, context }) {
  yield put({ type: `DELETE_${context}_LOADING` });
  try {
    const { data } = yield call(callFunction, payload);
    yield put({ type: `DELETE_${context}_SUCCESS`, data })
  } catch (err) {
    yield put({ type: `DELETE_${context}_FAILURE`, data: err })
  }
}

const watchRequestTenant = function* (context) {
  yield takeEvery(`FETCH_${context}`, fetch)
  yield takeEvery(`POST_${context}`, post)
  yield takeEvery(`PUT_${context}`, update)
  yield takeEvery(`DELETE_${context}`, destroy)
}

export default (context = '') => [
  watchRequestTenant(context),
]
