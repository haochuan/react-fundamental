import React, { Component } from 'react';
import List from '../List';
import CreateItem from '../CreateItem';
import Filter from '../Filter';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: 'all'
    };
  }

  createTodo = text => {
    if (text.trim() !== '') {
      this.setState({
        data: [...this.state.data, { text: text, completed: false }]
      });
    }
  };

  toggleTodo = id => {
    const currentTodo = this.state.data[id];
    const newTodo = { ...currentTodo, completed: !currentTodo.completed };

    this.setState({
      data: [
        ...this.state.data.slice(0, id),
        newTodo,
        ...this.state.data.slice(id + 1)
      ]
    });
  };

  setFilter = filter => {
    this.setState({ filter: filter });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <CreateItem createTodo={this.createTodo} />
        <List
          list={this.state.data}
          toggleTodo={this.toggleTodo}
          currentFilter={this.state.filter}
        />
        <Filter currentFilter={this.state.filter} setFilter={this.setFilter} />
      </div>
    );
  }
}

export default App;
