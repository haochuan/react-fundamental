# Async Actions

when we built the simple todo application. It was fully synchronous. Every time an action was dispatched, the state was updated immediately. What if you have to handle a HTTP request inside an action, where when you dispatch an action, the state could not be updated immediately?

When you do an asynchronous HTTP request, there are two crucial moments in time: the moment you start the call, and the moment when you receive an answer.

Usually, for any API request you'll want to dispatch at least three different kinds of actions:

- An action informing the reducers that the request began.
- An action informing the reducers that the request finished successfully.
- An action informing the reducers that the request failed.

```js
{ type: 'USER_FETCH_START' }
{ type: 'USER_FETCH_FAIL', error: 'Something Wrong' }
{ type: 'USER_FETCH_SUCCESS', response: { ... } }
```

Let's go through an example of writing the actions and the reducer for getting HTTP request.

##### Reducer

```js
const initState = { isFetching: false, data: [], error: null };

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_FETCH_START':
      return {
        ...state,
        isFetching: true
      };
    case 'USER_FETCH_FAIL':
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case 'USER_FETCH_SUCCESS':
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data
      };
    default:
      return state;
  }
};

export default reducer;
```

##### Action Creators

```js
function requestStart() {
  return {
    type: 'USER_FETCH_START'
  };
}
function requestSuccess(response) {
  return {
    type: 'USER_FETCH_SUCCESS',
    data: response.data
  };
}
function requestFail(error) {
  return {
    type: 'USER_FETCH_FAIL',
    error
  };
}
function getData() {
  dispatch(requestStart());
  axios
    .get('/api/users')
    .then(response => {
      dispatch(requestSuccess(response));
    })
    .catch(err => {
      dispatch(requestFail(err));
    });
}
```

The problem now is inside a action creator, there is no way we can have the access to `store` to dispatch other actions.

---

### [redux-thunk](https://github.com/gaearon/redux-thunk)

- Redux middleware
- Written by the creator of redux to help people to solve the issue we talked above
- Allows you to write action creators that return a function instead of an action, which give you the access to `store.getState()` and `store.dispatch()` inside the function.
- If you’re not sure whether you need it, you probably don’t.

Let's add this middleware to our application first:

```js
...
import thunk from 'redux-thunk';
...
const store = createStore(reducer, applyMiddleware(thunk));
```

Let's take a look at how we use the middleware:

```js
function requestStart() {
  return {
    type: 'USER_FETCH_START'
  };
}
function requestSuccess(response) {
  return {
    type: 'USER_FETCH_SUCCESS',
    data: response.data
  };
}
function requestFail(error) {
  return {
    type: 'USER_FETCH_FAIL',
    error
  };
}
function getData() {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .get('/api/users')
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(error => {
        dispatch(requestFail(error));
      });
  };
}
```

---

### More about `redux-thunk`

There is no magic inside `redux-thunk`, the entire source code of this middleware are just 4 lines of code:

```js
const thunk = store => next => action =>
  typeof action === 'function'
    ? action(store.dispatch, store.getState)
    : next(action);
```

If you feel the code is really hard to understand, think about it in the following way. Remember how the middleware works: It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

```js
// regular action creator
// which will return an object
const regularAction = () => {
  return { type: 'GET' };
};

// dispatch action
store.dispatch(regularAction());

// or

const action = regularAction();
// what is action?

store.dispatch(action);
// for this action, what will happen in redux-thunk middleware?

const thunkAction = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET' });
  };
};

// dispatch action
store.dispatch(thunkAction());

// or

const action = thunkAction();
// what is action?

store.dispatch(action);
// for this action, what will happen in redux-thunk middleware?
```

---

### Github User List Example

https://github.com/haochuan/react-fundamental/tree/master/examples/redux/github-userlist
