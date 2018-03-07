# Todo List Example - Component to show todo list

Create a new directory `TodoList` with `index.js` inside `src/components`:

```js
import React, {Component} from 'react';

const TodoList = ({list, onClick}) => {
  return (
    <ul>
      {list.map(todo => {
        return (
          <li
            key={todo.id}
            onClick={onClick}
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            {todo.text}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
```

Notice that it's better to create a new component just for a single list item from the perspective of React.

Create a new directory `Todo` with `index.js` inside `src/components`:

```js
import React from 'react';

const Todo = ({onClick, completed, text}) => {
  return (
    <li
      onClick={onClick}
      style={{textDecoration: completed ? 'line-through' : 'none'}}>
      {text}
    </li>
  );
};

export default Todo;
```

And the `TodoList` should become:

```js
import React from 'react';
import Todo from '../Todo';

const TodoList = ({list, onTodoClick}) => {
  return (
    <ul>
      {list.map(todo => {
        return (
          <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        );
      })}
    </ul>
  );
};

export default TodoList;
```

Now the only thing left here is to pass a `onTodoClick` function to `<TodoList>` from the `App` component:

```js
import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddTodo from '../../components/AddTodo';
import TodoList from '../../components/TodoList';
import * as actions from '../../actions';

class App extends Component {
  addTodo = text => {
    this.props.dispatch(actions.addTodo(text));
  };
  onTodoClick = id => {
    this.props.dispatch(actions.toggleTodo(id));
  };

  render() {
    console.log(this.props.todos);
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
        <TodoList list={this.props.todos} onTodoClick={this.onTodoClick} />
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
