# Todo List Example - Todo Reducer

After we know the structure of the state, next is to write the reducer.

First of all, create a new directory `reducers` inside `src`, then create a new file `todos.js` in `src/reducers/`.

### Knowing all actions

Think about what will happen to our todo list application:

* Add a new item in the list
* Toggle an existed item between `complete` and `incomplete`.

---

### Todo Reducer

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        } else {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
      });
    default:
      return state;
  }
};
export default todos;
```

---

### Writing Test

It is always a good practice to writing test in the whole development process. Since we just defined out recuder function for the todo list application. Let's write some tests for the recuder to make sure everything works as we expect.

Inside `src/reducers`, create a new file `todos.test.js` to write our test for `todos.js`.

```js
import todos from './todos';

describe('Test for todos reducer', () => {
  it('Should return empty array as init value', () => {
    expect(todos(undefined, {})).toEqual([]);
  });
  it('handle ADD_TODO action', () => {
    const action = {type: 'ADD_TODO', id: 1, text: 'first item'};
    const result = [{id: 1, text: 'first item', completed: false}];
    expect(todos(undefined, action)).toEqual(result);
  });
  it('handle TOGGLE action', () => {
    const addAction = {type: 'ADD_TODO', id: 1, text: 'first item'};
    const toggleAction = {type: 'TOGGLE_TODO', id: 1};
    const result = [{id: 1, text: 'first item', completed: true}];
    const newState = todos(undefined, addAction);
    expect(todos(newState, toggleAction)).toEqual(result);
  });
});
```

Then let's run the test with `npm test` or `npm run test`.
