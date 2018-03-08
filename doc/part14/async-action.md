# Async Actions

when we built the simple todo application. It was fully synchronous. Every time an action was dispatched, the state was updated immediately. What if you have to handle a HTTP request inside an action, where when you dispatch an action, the state could not be updated immediately?

When you do an asynchronous HTTP request, there are two crucial moments in time: the moment you start the call, and the moment when you receive an answer.

Usually, for any API request you'll want to dispatch at least three different kinds of actions:

* An action informing the reducers that the request began.
* An action informing the reducers that the request finished successfully.
* An action informing the reducers that the request failed.

```js
{ type: 'FETCH_DATA_REQUEST' }
{ type: 'FETCH_DATA_FAILURE', error: 'Something Wrong' }
{ type: 'FETCH_DATA_SUCCESS', response: { ... } }
```

Let's go through an example of writing the actions and the reducer for getting HTTP request.

##### Reducer

```js
const initState = {isFetching: false, users: [], err: ''};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        err: '',
        users: action.response.data,
      };
  }
};
```

##### Actions

```js
const initState = {isFetching: false, users: [], err: ''};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        isFetching: false,
        err: '',
        users: action.response.data,
      };
  }
};
```
