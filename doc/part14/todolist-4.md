# Todo List Example - Create Store

Let's review the concept of store first:

* Holds application state
* Allows access to state via `getState()`
* Allows state to be updated via `dispatch(action)`
* Registers listeners via `subscribe(listener)`

It's important to note that you'll only have a single store in a Redux application. When you want to split your data handling logic, you'll use `combineReducer()` to handle different part of a single store instead of many stores.

It's easy to create a store if you have a reducer. In the previous section, we used `combineReducers()` to combine several reducers into one. We will now import it, and pass it to `createStore()`.

Create a new directory `store` in `src`, and then create a new file for the store named `configureStore.js` inside `/src/store`:

```js
import {createStore} from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

export default store;
```

### Testing Store

After we get the store, it is the time to write some test for the store to make sure it works.

Create a new file `store.test.js` inside `src/store`:

```js
import store from './configureStore';

describe('Test for store', () => {
  it('Should have the init value', () => {
    const initState = {todos: [], filter: 'all'};
    expect(store.getState()).toEqual(initState);
  });
  it('handle ADD_TODO action', () => {
    const action = {type: 'ADD_TODO', id: 1, text: 'first item'};
    const resultState = {
      todos: [{id: 1, text: 'first item', completed: false}],
      filter: 'all',
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(resultState);
  });
  it('handle TOGGLE action', () => {
    const action = {type: 'TOGGLE_TODO', id: 1};
    const resultState = {
      todos: [{id: 1, text: 'first item', completed: true}],
      filter: 'all',
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(resultState);
  });
  it('handle SET_FILTER action', () => {
    const action = {type: 'SET_FILTER', filter: 'active'};
    const resultState = {
      todos: [{id: 1, text: 'first item', completed: true}],
      filter: 'active',
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(resultState);
  });
  it('stays the same for other unhandled actions', () => {
    const currentState = store.getState();
    const action = {type: 'RANDOM_ACTION'};
    store.dispatch(action);
    expect(store.getState()).toEqual(currentState);
  });
});
```
