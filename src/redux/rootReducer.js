import { combineReducers } from 'redux'
import docs from 'docs/reducer'
import tenant from 'tenant/reducer'

const rootReducer = combineReducers({
  docs,
  tenant
})

export default rootReducer
