import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// From previous

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
// Few Problems:
// 1. hard to wire
// 2. a lot of repetition
// 3. have to pass the entire store tree into the component
//
// The Provider component uses React's context feature to convert a store prop into a context property. Context is a way to pass information from a top-level component down to descendant components without components in the middle having to explicitly pass props.

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

// New
// BUT!!!
// If you want your application to be stable, don't use context. It is an experimental API and it is likely to break in future releases of React.
// now we need a way to convert context back into props. That's where connect comes in.
//
// connect is a HOC
// more of a higher order factory
// which takes two functions and returns a function that takes a component and returns a new component.
// That component subscribes to the store and updates your component's props when there are changes.
//
// gives us back a new function, and we pass our component to that function,
// which gives us a new component, which will automatically get all those mapped props
const connect = (
  mapStateToProps = () => ({}), // first function, return {} by default
  mapDispatchToProps = () => ({}) // second function, return {} by default
) => Component => {
  class Connected extends React.Component {
    onStoreOrPropsChange(props) {
      const { store } = this.context;
      const state = store.getState();
      const stateProps = mapStateToProps(state, props); // take the current state from store then return some props
      const dispatchProps = mapDispatchToProps(store.dispatch, props); // take dispatch from store then return some props
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

const App = ({ counter, increase, decrease }) => (
  <div className="App">
    <p>{counter}</p>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
);

const mapStateToProps = state => ({
  counter: state.counter
});

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

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
