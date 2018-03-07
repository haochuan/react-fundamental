# Todo List Example - Component to filter list

We are almost done for the todo list application. The only missing part is the component to filter our todo list.

Create a new directory `Filter` along with `index.js` inside `src/components`:

```js
import React, {Component} from 'react';

class Filter extends Component {
  setFilterAll = () => {
    this.props.setFilter('all');
  };
  setFilterActive = () => {
    this.props.setFilter('active');
  };
  setFilterCompleted = () => {
    this.props.setFilter('completed');
  };
  render() {
    const {filter} = this.props;
    return (
      <p>
        Show:{' '}
        {filter === 'all' ? (
          <span>All</span>
        ) : (
          <button onClick={this.setFilterAll}>All</button>
        )}{' '}
        {filter === 'active' ? (
          <span>Active</span>
        ) : (
          <button onClick={this.setFilterActive}>Active</button>
        )}{' '}
        {filter === 'completed' ? (
          <span>Completed</span>
        ) : (
          <button onClick={this.setFilterCompleted}>Completed</button>
        )}
      </p>
    );
  }
}
export default Filter;
```

Now add `<Filter>` component into `<App>`:

```js
import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddTodo from '../../components/AddTodo';
import TodoList from '../../components/TodoList';
import Filter from '../../components/Filter';
import * as actions from '../../actions';

class App extends Component {
  addTodo = text => {
    this.props.dispatch(actions.addTodo(text));
  };
  onTodoClick = id => {
    this.props.dispatch(actions.toggleTodo(id));
  };

  setFilter = filter => {
    this.props.dispatch(actions.setFilter(filter));
  };

  render() {
    console.log(this.props.todos);
    console.log(this.props.filter);
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
        <TodoList list={this.props.todos} onTodoClick={this.onTodoClick} />
        <Filter filter={this.props.filter} setFilter={this.setFilter} />
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

Why this is not working still?

We have not add the logic to do the actual filtering work to our todo list in `src/components/TodoList/index.js`:

```js
import React from 'react';
import Todo from '../Todo';

const TodoList = ({list, onTodoClick, filter}) => {
  let filteredList = [];
  if (filter === 'all') {
    filteredList = list;
  } else if (filter === 'active') {
    filteredList = list.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filteredList = list.filter(todo => todo.completed);
  }
  return (
    <ul>
      {filteredList.map(todo => {
        return (
          <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        );
      })}
    </ul>
  );
};
export default TodoList;
```

And remember we also need to pass the current filter value to `<TodoList>` to complete the filtering work. In `src/containers/App/index.js`:

```js
import React, {Component} from 'react';
import {connect} from 'react-redux';

import AddTodo from '../../components/AddTodo';
import TodoList from '../../components/TodoList';
import Filter from '../../components/Filter';
import * as actions from '../../actions';

class App extends Component {
  addTodo = text => {
    this.props.dispatch(actions.addTodo(text));
  };
  onTodoClick = id => {
    this.props.dispatch(actions.toggleTodo(id));
  };

  setFilter = filter => {
    this.props.dispatch(actions.setFilter(filter));
  };

  render() {
    console.log(this.props.todos);
    console.log(this.props.filter);
    return (
      <div>
        <AddTodo addTodo={this.addTodo} />
        <TodoList
          list={this.props.todos}
          onTodoClick={this.onTodoClick}
          filter={this.props.filter}
        />
        <Filter filter={this.props.filter} setFilter={this.setFilter} />
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
