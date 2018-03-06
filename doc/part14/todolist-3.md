# Todo List Example - Combine Reducers

Redux provides a utility function called `combineReducers()`, which help each of reducers manage its own part of the global state. The `state` parameter is different for every reducer, and corresponds to the part of the state it manages.

Let's create an entry point for all of the reducers. Create a file `index.js` in `src/reducers/`.

```js
import {combineReducers} from 'redux';
import todos from './todos';
import filter from './filter';

const reducers = combineReducers({
  todos,
  filter,
});

export default reducers;
```

When the app is larger, we can split the reducers into separate files and keep them completely independent and managing different data domains.
