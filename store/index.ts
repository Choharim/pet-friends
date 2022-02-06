import { configureStore } from '@reduxjs/toolkit'

import { createLogger } from 'redux-logger'

import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './root.reducer'
import createSagaMiddleware from 'redux-saga'

const devMode = process.env.NODE_ENV !== 'production'

const logger = createLogger({
  diff: true,
})

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(sagaMiddleware)
      .concat(logger),
  devTools: devMode,
})

const makeStore = () => store

export const reduxWrapper = createWrapper(makeStore, { debug: devMode })
