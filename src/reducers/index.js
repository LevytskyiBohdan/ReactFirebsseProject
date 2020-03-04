import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import modal from './modal';
import posts from './posts';
import post from './post';
import fileUpload from './fileUpload';
import currentStoreStatus from './currentStoreStatus';

import { reduxLoaderReducer } from 'redux-state-loader';

const createRootReducer = combineReducers({
  user,
  users,
  modal,
  posts,
  post,
  fileUpload,
  currentStoreStatus,
  reduxLoader: reduxLoaderReducer,
});
export default createRootReducer