import { takeEvery, put, call } from 'redux-saga/effects'
import {
  login, register, queryWarmup, addToken, removeToken,
} from 'utilities'
import {
  LOGIN_USER,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  REGISTER_USER_LOADING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  FETCH_WARMUP,
  FETCH_WARMUP_LOADING,
  FETCH_WARMUP_FAILURE,
  FETCH_WARMUP_SUCCESS,
} from './actions'


// worker
function* loginUser(action) {
  const { data: { email, password } } = action
  yield put({ type: LOGIN_USER_LOADING })
  try {
    const { data } = yield call(login, { email, password })
    addToken(data.token)
    console.log('SAGA LOGIN: save token to db')
    yield put({ type: LOGIN_USER_SUCCESS, data })
  } catch (err) {
    yield put({ type: LOGIN_USER_FAILURE, data: err })
  }
}

// watcher
const watchLogin = function* () {
  yield takeEvery(LOGIN_USER, loginUser)
}

// worker
function* registerUser(action) {
  const {
    data: {
      token,
      email,
      password,
      password_confirmation,
      name,
    },
  } = action
  yield put({ type: REGISTER_USER_LOADING })
  try {
    const { data } = yield call(register,
      {
        token,
        email,
        password,
        password_confirmation,
        name,
      })
    addToken(data.token)
    console.log('SAGA REGISTER: save token to db')
    yield put({ type: REGISTER_USER_SUCCESS, data })
  } catch (err) {
    yield put({ type: REGISTER_USER_FAILURE, data: err })
  }
}

// watcher
const watchRegister = function* () {
  yield takeEvery(REGISTER_USER, registerUser)
}


// worker
function* warmup() {
  yield put({ type: FETCH_WARMUP_LOADING })
  try {
    const { data } = yield call(queryWarmup)
    if (typeof data !== 'object') throw Error('invalid data')
    yield put({ type: FETCH_WARMUP_SUCCESS, data })
  } catch (err) {
    yield put({ type: FETCH_WARMUP_FAILURE, data: err })
    removeToken()
  }
}

// watcher
const watchWarmup = function* () {
  yield takeEvery(FETCH_WARMUP, warmup)
}

// export watcher iterators
export default [
  watchLogin(),
  watchWarmup(),
  watchRegister(),
]
