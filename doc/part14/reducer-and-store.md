# Reducer and Store

### Reducer

To describe the logic of how to change the state you have to write a function that takes the previous state of the app and the action being dispatched, then returns the next state of the app. This function is called the Reducer.

Let's review the definition of action again: An action is a plain JS object describing the change. In order to define the change, the action object usually has a key `type`, which is just a Javascript string to indicate the change.

Counter reducer example:

When writing a reducer, if state is not defined, return an initial state. In this counter example, we return 0 since our count will start from there. If the action being passed in isn't one the reducer recognizes, we just return the current state.

```js
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const increaseAction = {type: 'INCREMENT'};
const decreaseAction = {type: 'DECREMENT'};
const otherAction = {type: 'OTHER'};

console.log(counter());
console.log(counter(0, increaseAction));
console.log(counter(1, decreaseAction));
console.log(counter(0, otherAction));
```

---

### Store

The store binds together the 3 principles of Redux:

* Holds the current application state object
* Allows you to dispatch actions
* When you create it, you need to specify the reducer that tells how state is updated with actions.

```js
import {createStore} from 'redux';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);
```

`store` has three important methods:

1. `getState()` retrieves the current state of the Redux store. If we ran `console.log(store.getState())` with the code above, we could get `0` since it is the initial state of our application.

2. `dispatch()` is the most commonly used. It is how we dispatch actions to change the state of the application. If we run `store.dispatch( { type: 'INCREMENT' });` followed by `console.log(store.getState());` we will get `1` since

3. `subscribe()` registers a callback that the redux store will call any time an action has been dispatched so you can update the UI of your application to reflect the current application state. If you have the function `print()` and you write `store.subscribe(print)`, the `print()` function will be called every time if an action has been dispatched.
