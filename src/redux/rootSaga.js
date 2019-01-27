import { all } from 'redux-saga/effects'
import docsWatchers from 'docs/sagas'
import tenantWatchers from 'tenant/sagas'

export default function* rootSaga() {
  // add watchers here
  yield all([
    ...docsWatchers,
    ...tenantWatchers,
  ])
}
