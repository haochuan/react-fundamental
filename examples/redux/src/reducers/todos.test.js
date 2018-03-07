import todos from './todos';

describe('Test for todos reducer', () => {
  it('Should return empty array as init value', () => {
    expect(todos(undefined, {})).toEqual([]);
  });
  it('handle ADD_TODO action', () => {
    const action = { type: 'ADD_TODO', id: 1, text: 'first item' };
    const result = [{ id: 1, text: 'first item', completed: false }];
    expect(todos(undefined, action)).toEqual(result);
  });
  it('handle TOGGLE action', () => {
    const addAction = { type: 'ADD_TODO', id: 1, text: 'first item' };
    const toggleAction = { type: 'TOGGLE_TODO', id: 1 };
    const result = [{ id: 1, text: 'first item', completed: true }];
    const newState = todos(undefined, addAction);
    expect(todos(newState, toggleAction)).toEqual(result);
  });
});
