import { combineReducers } from 'redux'
import docs from 'docs/reducer'
import tenant from 'tenant/reducer'
import user from 'user/reducer'

const rootReducer = combineReducers({
  docs,
  tenant,
  user,
})

export default rootReducer
