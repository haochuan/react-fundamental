import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// ==================== From Previous Start =====================

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

const validateAction = action => {
  if (!action || typeof action !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }
  if (action.type === 'undefined') {
    throw new Error('Action must have a type');
  }
};
const createStore = (reducer, initialState) => {
  let state = initialState;
  const subscribers = [];
  const store = {
    dispatch: action => {
      validateAction(action);
      state = reducer(state, action);
      console.log('Action: ', action);
      console.log('Current State: ', state);
      subscribers.forEach(handler => handler());
    },
    getState: () => state,
    subscribe: handler => {
      // add handler into list
      subscribers.push(handler);
      console.log('Subscribe: ', handler);
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

// ==================== From Previous End =====================

// Few Problems:
// 1. have to use components to pass the store from top to lower
//  <App store={store}>
//    <Counter store={store}>
//      <A subStore={subStore}>
//        <B subStore={subStore} />
//      </A>
//    </Counter>
//    <AnotherCounter store={store}>
//      <A subStore={subStore}>
//        <B subStore={subStore} />
//      </A>
//    </AnotherCounter>
//  </App>
//
// 2. hard to wire, need to call subscribe and unsubscribe for every component
//
// The Provider component uses React's context feature
// to convert a store prop into a context property.
// Context is a way to pass information from a top-level component
// down to lower level components without components in the middle

class Provider extends Component {
  // pass props.store as store to its children
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: PropTypes.object
};

class Counter extends Component {
  constructor(props) {
    // store is the store from Provicer
    super();
    // get stage from store
    console.log('Props: ', props);
    console.log('Store: ', store);
    this.state = store.getState();
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  // subscribe the store
  componentWillMount() {
    // every dispatch event will trigger this.setState to get a new state to re-render the UI
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  // unsubscribe the store
  componentWillUnmount() {
    this.unsubscribe();
  }

  increase() {
    store.dispatch({
      type: INCREASE
    });
  }

  decrease() {
    store.dispatch({
      type: DECREASE
    });
  }

  render() {
    return (
      <div className="App">
        <p className="counter-value">{this.state.counter}</p>
        <div className="button-container">
          <button onClick={this.increase}>Increase</button>
          <button onClick={this.decrease}>Decrease</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
);
