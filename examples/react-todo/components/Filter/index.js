import React from 'react';
import './style.css';

const Filter = props => {
  return (
    <div className="Filter">
      <button
        className="Filter-button"
        onClick={() => {
          props.setFilter('all');
        }}
        disabled={props.currentFilter === 'all'}
      >
        All
      </button>
      <button
        className="Filter-button"
        onClick={() => {
          props.setFilter('completed');
        }}
        disabled={props.currentFilter === 'completed'}
      >
        Completed
      </button>
      <button
        className="Filter-button"
        onClick={() => {
          props.setFilter('active');
        }}
        disabled={props.currentFilter === 'active'}
      >
        Active
      </button>
    </div>
  );
};

export default Filter;
