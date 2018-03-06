# Immutable State

Pure functions are those whose return values depend only upon the values of their arguments. Pure functions don't have side effects like network or database calls. Pure functions also do not override the values of anything. In the above example, a new array is returned instead of modifying the items that was passed in.

### Avoiding Array Mutations

Suppose that in the state we have a key named `users` to store a user list. The user list is a Javascript Array of Javascript Objects, like:

```js
[
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'},
  {id: 4, name: 'd'},
  {id: 5, name: 'e'},
];
```

Then we define a reducer function, return new state based on different actions:

```js
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return state.push(action.user);
    ...
  }
}

reducer([], {type: 'ADD', user: {id: 1, name: 'a'}});
```

Why this won't work?

Pure functions also do not override the values of anything. In this case, `state.push()` will override the old state.

Instead:

```js
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {action.user}]
    ...
  }
}
```

Then think about how to perform a `DELETE`:

```js
const initState = [
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'},
  {id: 4, name: 'd'},
  {id: 5, name: 'e'},
];
const reducer = (state = initState, action) => {
  const index = action.index;
  switch (action.type) {
    case 'DELETE':
      // wrong way
      return state.splice(index, 1);
      // right way
      return [...state.slice(0, index), ...state(index + 1)];
    ...
  }
}

reducer(initState, {type: 'DELETE', index: 2});
```

Then think about how to perform a `UPDATE`:

```js
const initState = [
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'},
  {id: 4, name: 'd'},
  {id: 5, name: 'e'},
];
const reducer = (state = initState, action) => {
  const {index, user} = action;
  switch (action.type) {
    case 'UPDATE':
      return [
        ...state.slice(0, index),
        user,
        ...state.slice(index + 1)
      ];
    ...
  }
}

reducer(initState, {type: 'UPDATE', user: {id: 3, name: 'ddd'}});
```

---

### Avoiding Object Mutations

Like the examples about how we return a new Array based on the old Array, we also need to know how to change an Object based on the old Object. Suppose we have:

```js
const initState = {
  id: 1,
  name: 'a',
  isAdmin: false
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SWITCH_ADMIN':
      return {
        ...state,
        isAdmin: !state.isAdmin
      }
    ...
  }
}
reducer(initState, {type: 'SWITCH_ADMIN'});
```
