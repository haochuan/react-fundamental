import React, { Component } from 'react';

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
    const { filter } = this.props;
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
