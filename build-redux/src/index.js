import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Counter Component
class Counter extends Component {
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

//Redux bills itself as "a predictable state container for JavaScript apps". Feed in the same set of actions, and you'll end up in the same state.

// Test Reducer

console.log('========== Reducer Test Start ==========');
console.log('INIT STATE: ', { counter: 0 });
const state_0 = reducer({ counter: 0 }, { type: INCREASE });
console.log('INCREASE: ', state_0);
const state_1 = reducer(state_0, { type: INCREASE });
console.log('INCREASE: ', state_1);
const state_2 = reducer(state_1, { type: DECREASE });
console.log('DECREASE: ', state_2);
console.log('========== Reducer Test End ==========');

// The Store
// hold onto our single state variable as well as some useful methods for setting and getting the state

// validate if the action is an non array object
const validateAction = action => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }
  if (action.type === 'undefined') {
    throw new Error('Action must have a type');
  }
};

//const createStore = reducer => {
//let state = undefined;
//return {
//// dispatch action
//// 1. validation
//// 2. set new state
//dispatch: action => {
//validateAction(action);
//state = reducer(state, action);
//},
//// get state
//getState: () => state
//};
//};

//// Test Store

//console.log('========== Store Test Start ==========');
//const store = createStore(reducer);
//console.log('INIT STORE: ', store.getState());
//store.dispatch({ type: INCREASE });
//console.log('INCREASE STORE: ', store.getState());
//store.dispatch({ type: DECREASE });
//console.log('DECREASE STORE: ', store.getState());
//console.log('========== Store Test End ==========');
// Render React
//
//ReactDOM.render(<Counter />, document.getElementById('root'));

// We have a store that can use any reducer we provide to manage the state. But it's still missing an important bit: A way to subscribe to changes.
const createStore = (reducer, initialState) => {
  let state = initialState;
  const subscribers = [];
  const store = {
    dispatch: action => {
      validateAction(action);
      state = reducer(state, action);
      subscribers.forEach(handler => handler());
    },
    getState: () => state,
    subscribe: handler => {
      // add handler into list
      subscribers.push(handler);
      // return unsubscribe function
      return () => {
        const index = subscribers.indexOf(handler);
        if (index > 0) {
          subscribers.splice(index, 1);
        }
      };
    }
  };
  return store;
};

const store = createStore(reducer, initialState);

class App extends Component {
  constructor(props) {
    super();
    // get stage from store
    this.state = props.store.getState();
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  // subscribe the store
  componentWillMount() {
    // every dispatch event will trigger this.setState to get a new state to re-render the UI
    this.unsubscribe = this.props.store.subscribe(() => {
      this.setState(this.props.store.getState());
    });
  }
  // unsubscribe the store
  componentWillUnmount() {
    this.unsubscribe();
  }

  increase() {
    this.props.store.dispatch({
      type: INCREASE
    });
  }

  decrease() {
    this.props.store.dispatch({
      type: DECREASE
    });
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.counter}</p>
        <button onClick={this.increase}>Increase</button>
        <button onClick={this.decrease}>Decrease</button>
      </div>
    );
  }
}

// Render React
ReactDOM.render(<App store={store} />, document.getElementById('root'));
