import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import user from './user';
import modal from './modal';
import posts from './posts';
import fileUpload from './fileUpload';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  user,
  modal,
  posts,
  fileUpload,
});
export default createRootReducer