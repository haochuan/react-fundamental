import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// ==================== From Previous Start ====================

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
// We have a store that can use any reducer we provide to manage the state.
// But it's still missing an important bit: A way to subscribe to changes.
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

class Provider extends Component {
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

// ==================== From Previous End ====================

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
//
// Based on redux, we are not getting the store via context
// we are getting the store via props
// now we need a way to convert context back into props. That's where connect comes in.
//
// connect is a HOC
// more of a higher order factory
// which takes two functions and returns a function that takes a component
// and returns a new component.
// That component subscribes to the store and updates
// your component's props when there are changes.
//
const connect = (
  mapStateToProps = () => ({}), // first function, return {} by default
  mapDispatchToProps = () => ({}) // second function, return {} by default
) => Component => {
  class Connected extends React.Component {
    onStoreOrPropsChange(props) {
      const { store } = this.context;
      const state = store.getState(); // redux state
      // take the current state from store then return some props
      /*
       *{
       *  a: state.a,
       *  b: state.b
       *}
       */
      const stateProps = mapStateToProps(state);
      // take dispatch from store then return some props
      const dispatchProps = mapDispatchToProps(store.dispatch);
      // store those returned props into it's own state
      this.setState({
        ...stateProps,
        ...dispatchProps
      });
    }
    componentWillMount() {
      const { store } = this.context;
      // init props
      this.onStoreOrPropsChange(this.props);
      // subscribe
      this.unsubscribe = store.subscribe(() =>
        this.onStoreOrPropsChange(this.props)
      );
    }
    componentWillReceiveProps(nextProps) {
      // update props
      this.onStoreOrPropsChange(nextProps);
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    render() {
      // pass props and own state all into props
      return <Component {...this.props} {...this.state} />;
    }
  }

  Connected.contextTypes = {
    store: PropTypes.object
  };

  return Connected;
};

// 1. ComponentWillMount: get store => store this.props into this.state => subscribe
// 2. CompomentillReceiveProps: set the newest props into this.state
// 3. ComponentWillUnmount: unsubscribe
// 4. render: return new component with all this.props and this.state mapped to this.props

// takes state, returns new props using state
const mapStateToProps = state => ({
  counter: state.counter
});

// takes dispatch, returns new props using dispatch
const mapDispatchToProps = dispatch => ({
  increase: () =>
    dispatch({
      type: INCREASE
    }),
  decrease: () =>
    dispatch({
      type: DECREASE
    })
});

const Counter = ({ counter, increase, decrease }) => (
  <div className="App">
    <p className="counter-value">{counter}</p>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
);

const App = connect(mapStateToProps, mapDispatchToProps)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
