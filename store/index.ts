import { applyMiddleware, createStore, compose } from '@reduxjs/toolkit'

import createSagaMiddleware, { Task } from 'redux-saga'
import { createLogger } from 'redux-logger'

import { createWrapper } from 'next-redux-wrapper'

import rootSaga from 'store/root.saga'
import rootReducer from 'store/root.reducer'

declare module 'redux' {
  export interface Store {
    sagaTask: Task
  }
}

const devMode = process.env.NODE_ENV !== 'production'

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const logger = createLogger({
    diff: true,
  })

  const enhancer = compose(applyMiddleware(sagaMiddleware, logger))

  const store = createStore(rootReducer, enhancer)

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const reduxWrapper = createWrapper(makeStore, { debug: devMode })
