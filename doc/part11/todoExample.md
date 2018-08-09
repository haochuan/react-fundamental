### Simple todo list example

```js
import React, {Component} from 'react';
const Filter = props => {
  return (
    <div className="Filter">
      <button
        onClick={() => {
          props.setFilter('all');
        }}
        disabled={props.currentFilter === 'all'}>
        All
      </button>
      <button
        onClick={() => {
          props.setFilter('active');
        }}
        disabled={props.currentFilter === 'active'}>
        Active
      </button>
      <button
        onClick={() => {
          props.setFilter('completed');
        }}
        disabled={props.currentFilter === 'completed'}>
        Completed
      </button>
    </div>
  );
};
const TodoList = props => {
  // props.todos will be the todo array
  // from App component
  const {currentFilter} = props;
  const todosToShow = props.todos.filter(todo => {
    if (currentFilter === 'all') {
      return true;
    } else if (currentFilter === 'active') {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });
  return (
    <ul>
      {todosToShow.map((todo, index) => {
        return (
          <li
            key={index}
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
            onClick={() => {
              props.toggleTodo(index);
            }}>
            {todo.text}
          </li>
        );
      })}
    </ul>
  );
};
class AddTodo extends Component {
  state = {input: ''};

  render() {
    return (
      <div className="AddTodo">
        <input
          value={this.state.input}
          onChange={e => {
            this.setState({input: e.target.value});
          }}
        />
        <button
          onClick={() => {
            this.props.addTodo(this.state.input);
            this.setState({input: ''});
          }}>
          Add New
        </button>
      </div>
    );
  }
}

class App extends Component {
  // for every single todo
  // {text: <String>, completed: <Bool>}
  state = {todos: [], filter: 'all'};

  addTodo = text => {
    this.setState({
      todos: [...this.state.todos, {text, completed: false}],
    });
  };

  toggleTodo = index => {
    this.setState({
      todos: [
        ...this.state.todos.slice(0, index),
        {
          ...this.state.todos[index],
          completed: !this.state.todos[index].completed,
        },
        ...this.state.todos.slice(index + 1),
      ],
    });
  };

  setFilter = filter => {
    this.setState({filter: filter});
  };
  render() {
    return (
      <div className="App">
        <AddTodo addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          currentFilter={this.state.filter}
        />
        <Filter setFilter={this.setFilter} currentFilter={this.state.filter} />
      </div>
    );
  }
}

export default App;
```
