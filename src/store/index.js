import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        logger
        // ... other middlewares ...
      ),
    ),
  )

  return store
}


// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './rootReducer';
// import initialStore from './initialStore';

// export default function configureStore() {

	
// 	return createStore(
// 	  rootReducer,
// 	  initialStore,
// 	  composeWithDevTools(
// 	    applyMiddleware(
// 	      thunk
// 	    )
// 	  )
// 	);
// }