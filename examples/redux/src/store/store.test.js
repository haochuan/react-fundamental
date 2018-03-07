import store from './configureStore';

describe('Test for store', () => {
  it('Should have the init value', () => {
    const initState = { todos: [], filter: 'all' };
    expect(store.getState()).toEqual(initState);
  });
  it('handle ADD_TODO action', () => {
    const action = { type: 'ADD_TODO', id: 1, text: 'first item' };
    const resultState = {
      todos: [{ id: 1, text: 'first item', completed: false }],
      filter: 'all'
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(resultState);
  });
  it('handle TOGGLE action', () => {
    const action = { type: 'TOGGLE_TODO', id: 1 };
    const resultState = {
      todos: [{ id: 1, text: 'first item', completed: true }],
      filter: 'all'
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(resultState);
  });
  it('handle SET_FILTER action', () => {
    const action = { type: 'SET_FILTER', filter: 'active' };
    const resultState = {
      todos: [{ id: 1, text: 'first item', completed: true }],
      filter: 'active'
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(resultState);
  });
  it('stays the same for other unhandled actions', () => {
    const currentState = store.getState();
    const action = { type: 'RANDOM_ACTION' };
    store.dispatch(action);
    expect(store.getState()).toEqual(currentState);
  });
});
