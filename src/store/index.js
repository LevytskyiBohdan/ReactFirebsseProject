import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import { reduxLoaderMiddleware } from 'redux-state-loader';

const loaderMiddleware = reduxLoaderMiddleware();

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        loaderMiddleware,
        logger
        // ... other middlewares ...
      ),
    ),
  )

  return store
}
