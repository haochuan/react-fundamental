# Redux Three Principles

### Single source of truth

The state of your whole application is stored in an object tree within a single store. In other word: the entire state of the application will be represented by one JavaScript object.

Example: [twitter](https://mobile.twitter.com)

---

### State is read-only

The only way to change the state is to emit an action, an object describing what happened.

The second principle of Redux is that the state tree is read only. Any time you want to change the state, you have to dispatch an action. An action is a plain JS object describing the change. Just like the state is the minimal representation of the data, the action is the minimal representation of the change to that data.

---

### Changes are made with pure functions

To specify how the state tree is transformed by actions, you write pure reducers.

Before learning more about Redux, it's important to know the difference between "Pure" and "Impure" functions.

* Pure function

```js
function square(x) {
  return x * x;
}
function squareAll(items) {
  return items.map(square);
}
```

Pure functions are those whose return values depend only upon the values of their arguments. Pure functions don't have side effects like network or database calls. Pure functions also do not override the values of anything. In the above example, a new array is returned instead of modifying the items that was passed in.

* Impure function

```js
function square(x) {
  updateXInDatabase(x);
  return x * x;
}
function squareAll(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}
```

Contrast the "Impure" function. A database is called, and values passed in are being overwritten.

Inside a Redux application there is one particular function that takes the previous state and the action being dispatched, and returns the next state of the whole application. Reducer is the function knowing how to return a new state based on the action it receives.

It is important that the function is pure (i.e. the state being given to it isn't modified) because it has to return the new object representing the application's new state.

This is the 3rd and final principle of Redux: to describe the logic of how to change the state you have to write a function that takes the previous state of the app and the action being dispatched, then returns the next state of the app. This function is called the Reducer.
