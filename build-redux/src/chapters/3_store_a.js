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

const createStore = (initialState, reducer) => {
  let state = initialState;
  return {
    // dispatch action
    // 1. validation
    // 2. set new state
    dispatch: action => {
      validateAction(action);
      state = reducer(state, action);
    },
    // get state
    getState: () => state
  };
};

// Test Store

console.log('========== Store Test Start ==========');
const store = createStore(initialState, reducer);
console.log('INIT STORE: ', store.getState());
store.dispatch({ type: INCREASE });
console.log('INCREASE STORE: ', store.getState());
store.dispatch({ type: DECREASE });
console.log('DECREASE STORE: ', store.getState());
console.log('========== Store Test End ==========');
