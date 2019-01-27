import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import rootReducer from 'redux/rootReducer'
import rootSaga from 'redux/rootSaga'

function setupStore() {
  const saga = createSagaMiddleware()
  const middleware = [saga, logger]

  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware)),
  )

  saga.run(rootSaga)

  return store
}

const store = setupStore()

export default store
