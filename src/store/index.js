import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from '../reducers/';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { reduxLoaderMiddleware } from 'redux-state-loader';

const loaderMiddleware = reduxLoaderMiddleware();

export const history = createBrowserHistory()

const middleware = [
  thunk,
  loaderMiddleware,
]

if (process.env.NODE_ENV === 'development') middleware.push(logger);

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer, // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        ...middleware
      ),
    ),
  )

  return store
}
