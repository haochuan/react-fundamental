# Todo List Example - Connect React with Redux

Redux is a predictable state container for JavaScript apps. Redux is not only made for React, but it is a good pair to use with React.

Remember before how we manually use `store.subscribe()` function to register the `render` function, in order to update the UI every time when there is an action dispatched.

```js
const store = createStore(counterReducer);
store.subscribe(render);
```

### [`react-redux`](https://github.com/reactjs/react-redux)

`react-redux` is a official binding library to use Redux with React.

Remember that React bindings are not included in Redux by default. You need to install them explicitly:

```
npm install redux react-redux --save
```

The way we recommend to use Redux with React is to use a special Component `<Provider>` from `react-redux`, to magically make the store available to all React Components in the application without passing it every time. You only need to use it once when you render the root Component:

Let's create a new file `index.js` inside `src`, which will be the entry point for the whole application:

```js
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import store from './store/configureStore';
import App from './containers/App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

We still don't have any React Component defined yet, Let's create our first component. Create a new directory `containers` inside `src`, then create a new directory `App` inside `src/containers`, then create a file `index.js` inside `src/containers/App`.

```js
import React, {Component} from 'react';

class App extends Component {
  render() {
    return <div>Hello World.</div>;
  }
}
```

Now we just need one more step to connect our `App` Component with Redux using `connect()` function from `react-redux`:

To use `connect()`, you need to define a special function called `mapStateToProps` that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping.

In addition to reading the state, components can dispatch actions. In a similar fashion, you can define a function called `mapDispatchToProps()` that receives the `dispatch()` method and returns callback props that you want to inject into the presentational component.

In `App` Component:

```js
import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.setFilter('active');
    }, 5000);
  }
  render() {
    console.log(this.props.todos);
    console.log(this.props.filter);
    return <div>Hello World.</div>;
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    filter: state.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => {
      dispatch({type: 'SET_FILTER', filter: filter});
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

* With the function `mapStateToProps`, we are mapping `state.todos` as `props.todos` and `state.filter` as `props.filter` in `App` componnet.

* With the function `mapDispatchToProps`, we are mapping the function `setFilter` as `props.setFilter` in `App` componnet.

* `mapStateToProps` and `mapDispatchToProps` are both optional parameters for the `connect`function. If you passing nothing, nothing will be mapped.
