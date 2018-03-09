import { combineReducers } from 'redux';
import users from './users';
import currentUser from './currentUser';

const reducers = combineReducers({
  users,
  currentUser
});

export default reducers;
