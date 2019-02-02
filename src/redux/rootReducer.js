import { combineReducers } from 'redux'
import docs from 'docs/reducer'
import tenant from 'tenant/reducer'
import user from 'user/reducer'
import withNameCrudReducer from './withNameCrudReducer';

const rootReducer = combineReducers({
  docs,
  tenant,
  user,
  units: withNameCrudReducer('UNITS'),
  resources: withNameCrudReducer('RESOURCES'),
  users: withNameCrudReducer('USERS'),
})

export default rootReducer
