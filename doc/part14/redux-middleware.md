# Redux Middleware

If you've used server-side libraries like Express, you were also probably already familiar with the concept of middleware. In these frameworks, middleware is some code you can put between the framework receiving a request, and the framework generating a response.

Redux middleware solves different problems than Express middleware, but in a conceptually similar way. It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

### Example - Logging

One of the benefits of Redux is that it makes state changes predictable and transparent. Every time an action is dispatched, the new state is computed and saved. The state cannot change by itself, it can only change as a consequence of a specific action.

It is good if we logged every action that happens in the app, together with the state computed after it for development and debugging. When something goes wrong, we can look back at our log, and figure out which action corrupted the state.

#### Manually

The most naïve solution is just to log the action and the next state yourself every time you call `store.dispatch(action)`. It's not really a solution, but just a first step towards understanding the problem.

Suppose that you will call this to dispatch an action in the component:

```js
store.dispatch(addTodo('First Todo'));
```

In order to log the action and the state, you have to change the code to:

```js
const action = addTodo('First Todo');
console.log('dispatching', action);
store.dispatch(action);
console.log('next state', store.getState());
```

This produces the desired effect, but you wouldn't want to do it every time.

#### Using Middleware

We have a middleware logger:

```js
const logger = store => next => action => {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
};
```

If we want to use the middleware, we use `applyMiddleware` function from `redux` when we create the store:

```js
// before
import {createStore} from 'redux';
import reducers from '../reducers';
const store = createStore(reducers);

// when apply middleware
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import logger from './logger';
const store = createStore(reducers, applyMiddleware(logger));
```

Let's take a close look about how to write middleware:

```js
const logger = store => next => action => {
  // here is the place to hold the logic of the middleware
  // do not worried about why use this syntax or how it will be called
  // just remember using this syntax to write middleware and
  // you have access to store and the action here
  // also you need to call next(action) to pass the action to reducer
  // to continue the rest of the code
};

// without arrow function:

const loggingMiddleware = function(store) {
  return function(next) {
    return function(action) {
      // write your middleware here
      next(action);
    };
  };
};
```

---

### Example Action Delay

In this example, we are going to write a middleware, which can schedule actions with `{delay: N}` to be delayed by N milliseconds.

```js
const delayAction = store => next => action => {
  if (!action.delay || Number(action.delay) !== action.delay) {
    return next(action);
  }
  setTimeout(() => next(action), action.delay);
};
```

---

### Using multiple middleware together

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import logger from './middleware/logger';
import delayAction from './middleware/delayAction';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counterReducer, applyMiddleware(logger, delayAction));

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const mapStateToProps = state => {
  return {
    value: state,
  };
};

const ConnectedCounter = connect(mapStateToProps)(Counter);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedCounter
        value={store.getState()}
        onIncrement={() =>
          store.dispatch({
            type: 'INCREMENT',
            delay: 3000,
          })
        }
        onDecrement={() =>
          store.dispatch({
            type: 'DECREMENT',
            delay: 1000,
          })
        }
      />
    </Provider>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

Think about why the logger middleware is not working as we expect:

```js
const logger = store => next => action => {
  console.log('dispatching', action);
  next(action);
  console.log('next state', store.getState());
};
```
