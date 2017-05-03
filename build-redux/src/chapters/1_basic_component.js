import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Basic Counter Component using own state
class Counter extends Component {
  constructor(props) {
    super();
    this.state = { counter: 0 };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  increase() {
    this.setState({ counter: this.state.counter + 1 });
  }
  decrease() {
    this.setState({ counter: this.state.counter - 1 });
  }
  render() {
    return (
      <div className="App">
        <p>{this.state.counter}</p>
        <button onClick={this.increase}>Increase</button>
        <button onClick={this.decrease}>Decrease</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
