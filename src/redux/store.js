import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { save, load } from 'redux-localstorage-simple'
import logger from 'redux-logger'
import rootReducer from 'redux/rootReducer'
import rootSaga from 'redux/rootSaga'

const isProductionEnv = process.env.NODE_ENV === 'production'

function setupPreloadedState() {
  return load({
    states: ['user'],
  })
}

// saga is passed to function because it needs to be used in setupStore
// after the createStore function
function setupEnhancers(saga) {
  const middleware = [saga]
  // logger for dev env
  if (!isProductionEnv) middleware.push(logger)

  const enhancers = applyMiddleware(
    ...middleware,
    save({
      states: ['user'],
    })
  )
  if (!isProductionEnv) return composeWithDevTools(enhancers)
  return applyMiddleware(enhancers)
}

function setupStore() {
  const saga = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    setupPreloadedState(),
    setupEnhancers(saga),
  )

  saga.run(rootSaga)

  return store
}

const store = setupStore()

export default store
