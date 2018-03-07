# Todo List Example - Action Creator

Action creator is functions that create actions. For most of the case in React and Redux, we dispatch an action using the action creator:

```js
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text,
  };
}
dispatch(addTodo(text));
```

Instead of:

```js
dispatch({type: 'ADD_TODO', text: text});
```

Here are several main reasons:

* Basic abstraction: Rather than writing action type strings in every component that needs to create the same type of action, put the logic for creating that action in one place

* Documentation: The parameters of the function act as a guide for what data is needed to go into the action.

* Code separation: Consistently using action creators means that a component doesn't have to know any of the details of creating and dispatching the action.

Think about the example below:

```js
const filter = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};
```

Let's create some action creators for our todo app now. Create a new directory `actions` inside `src`, then create a file `index.js` in `src/actions`.

```js
let nextTodoId = 0;
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text,
});

export const setFilter = filter => ({
  type: 'SET_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
```

We still need to wrtie tests for action creators, create a new file `index.test.js` inside `src/actions`:

```js
import * as actions from './index';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: 'ADD_TODO',
      id: 0,
      text: 'Use Redux',
    });
  });

  it('setFilter should create SET_FILTER action', () => {
    expect(actions.setFilter('active')).toEqual({
      type: 'SET_FILTER',
      filter: 'active',
    });
  });

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: 'TOGGLE_TODO',
      id: 1,
    });
  });
});
```

When your project gets heavier, you can separate action creators in to different files, and use `actions/index.js` as the entry point for all actions.
