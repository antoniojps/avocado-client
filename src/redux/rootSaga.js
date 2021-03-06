import { all } from 'redux-saga/effects'
import docsWatchers from 'docs/sagas'
import tenantWatchers from 'tenant/sagas'
import userWatchers from 'user/sagas'
import withNameCrudWatcher from './withNameCrudWatcher';

export default function* rootSaga() {
  // add watchers here
  yield all([
    ...docsWatchers,
    ...tenantWatchers,
    ...userWatchers,
    ...withNameCrudWatcher('UNITS'),
    ...withNameCrudWatcher('RESOURCES'),
    ...withNameCrudWatcher('USERS'),
  ])
}
