import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }
  handleInput = e => {
    this.setState({ input: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({ input: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input value={this.state.input} onChange={this.handleInput} />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
