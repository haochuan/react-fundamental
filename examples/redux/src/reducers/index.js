import { combineReducers } from 'redux';
import todos from './todos';
import filter from './filter';

const reducers = combineReducers({
  todos,
  filter
});

export default reducers;
