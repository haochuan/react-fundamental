import React from 'react';
import './style.css';
const List = props => {
  const { list } = props;
  return (
    <ul className="List">
      {list.map((item, index) => {
        if (shouldShow(props.currentFilter, item.completed)) {
          return (
            <li
              className="List-item"
              key={index}
              onClick={() => {
                props.toggleTodo(index);
              }}
              style={{
                textDecoration: item.completed ? 'line-through' : 'none'
              }}
            >
              {item.text}
            </li>
          );
        } else {
          return null;
        }
      })}
    </ul>
  );
};

function shouldShow(currentFilter, completed) {
  if (currentFilter === 'all') {
    return true;
  } else if (currentFilter === 'completed' && completed) {
    return true;
  } else if (currentFilter === 'active' && !completed) {
    return true;
  } else {
    return false;
  }
}

export default List;
