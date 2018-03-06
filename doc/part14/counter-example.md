# Counter Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

const counterReducer = (state = 0, action) => {
  console.log('Action received: ');
  console.log(action);
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const render = () => {
  console.log('Current State: ');
  console.log(store.getState());
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT',
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT',
        })
      }
    />,
    document.getElementById('root'),
  );
};
const store = createStore(counterReducer);
store.subscribe(render);

render();
```

When the Counter is rendered, we specify that its value should be taken from the Redux store's current state. When the user presses a button, the corresponding action is dispatched to the Redux store.

The reducer specifies how the next state is calculated based on the current state and the action being dispatched.

Finally, we subscribe to the Redux store so our render() function runs any time the state changes so our Counter gets the current state.
