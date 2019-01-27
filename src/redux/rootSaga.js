import { all } from 'redux-saga/effects'
import docsWatchers from 'docs/sagas'

export default function* rootSaga() {
  // add watchers here
  yield all([
    ...docsWatchers,
  ])
}
