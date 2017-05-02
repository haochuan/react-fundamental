import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Counter Component
class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Value</p>
        <button>Increase</button>
        <button>Decrease</button>
      </div>
    );
  }
}

// Reducer
// function that takes the current state and an action and returns the new state
// For the counter app, if we provide an action to increase the number, we should get a new state with number = number + 1
// State in immutable

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const initialState = { counter: 0 };

const reducer = (state = initialState, action) => {
  const { counter } = state;
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: counter + 1
      };
    case DECREASE:
      return {
        ...state,
        counter: counter - 1
      };
    default:
      return state;
  }
};

// Test Reducer

console.log('INIT STATE: ', { counter: 0 });
const state_0 = reducer({ counter: 0 }, { type: INCREASE });
console.log('INCREASE: ', state_0);
const state_1 = reducer(state_0, { type: INCREASE });
console.log('INCREASE: ', state_1);
const state_2 = reducer(state_1, { type: DECREASE });
console.log('DECREASE: ', state_2);

// Render React
ReactDOM.render(<App />, document.getElementById('root'));
