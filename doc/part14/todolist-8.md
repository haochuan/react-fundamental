# Todo List Example - Component to add new todo

Up to now, we have:

* action creators to create different actions
* reducers to return a new state based on different actions
* store that holds the state
* `App` component which is connected to redux useing `connect` and `<Provider>`.

Now it's a time to work on some React components. We are going to write the component to add a new todo first.

Create a new directory `AddTodo` with `index.js` inside `src/components`:

```js
import React, {Component} from 'react';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};
  }
  handleInput = e => {
    this.setState({input: e.target.value});
  };

  submit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({input: ''});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input value={this.state.input} onChange={this.handleInput} />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
```

Remember you need to pass a `addTodo` function to `AddTodo` component from its parent (container).

Let's rewrite the `App` component to add the `AddTodo` compoennt into the application.

```js
import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddTodo from '../../components/AddTodo';
import * as actions from '../../actions';

class App extends Component {
  addTodo = text => {
    console.log(text);
    this.props.dispatch(actions.addTodo(text));
  };

  render() {
    console.log(this.props.todos);
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    filter: state.filter,
  };
};

export default connect(mapStateToProps)(App);
```
