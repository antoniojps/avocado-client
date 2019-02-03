import { takeEvery, put, call } from 'redux-saga/effects'
import { login } from 'utilities'
import {
  LOGIN_USER,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from './actions'


// worker
function* loginUser(action) {
  const { data: { email, password } } = action
  yield put({ type: LOGIN_USER_LOADING })
  try {
    const { data } = yield call(login, { email, password })
    yield put({ type: LOGIN_USER_SUCCESS, data })
  } catch (err) {
    yield put({ type: LOGIN_USER_FAILURE, data: err })
    localStorage.removeItem('redux_localstorage_simple_user')
  }
}

// watcher
const watchLogin = function* () {
  yield takeEvery(LOGIN_USER, loginUser)
}

// export watcher iterators
export default [
  watchLogin(),
]
