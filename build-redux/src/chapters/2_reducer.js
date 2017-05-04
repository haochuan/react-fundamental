// Reducer
// function that takes the current state and an action and returns a new state
// For the counter app, if we provide an action to increase the number,
// we should get a new state with number = number + 1
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

// Redux bills itself as "a predictable state container for JavaScript apps".
// Feed in the same set of actions, and you'll end up in the same state.

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
