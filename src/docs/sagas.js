import ax from 'axios'
import { takeEvery, put, call } from 'redux-saga/effects'
import {
  REQUEST_STARSHIP,
  REQUEST_STARSHIP_LOADING,
  REQUEST_STARSHIP_SUCCESS,
  REQUEST_STARSHIP_FAILURE,
} from './actions'

const axios = ax.create({
  baseURL: 'https://swapi.co',
  timeout: 1000,
})

const requestStarship = async () => axios.get('api/starships/9/')

// worker
function* getStarship() {
  yield put({ type: REQUEST_STARSHIP_LOADING })
  try {
    const { data } = yield call(requestStarship, 9)
    yield put({ type: REQUEST_STARSHIP_SUCCESS, data })
  } catch (err) {
    yield put({ type: REQUEST_STARSHIP_FAILURE, data: err })
  }
}

// watcher
const watchRequestStarship = function* () {
  yield takeEvery(REQUEST_STARSHIP, getStarship)
}

// export watcher iterators
export default [
  watchRequestStarship(),
]
