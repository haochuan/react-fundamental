import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    filter: state.filter
  };
};

export default connect(mapStateToProps)(App);
