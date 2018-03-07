import React from 'react';
import Todo from '../Todo';

const TodoList = ({ list, onTodoClick, filter }) => {
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
