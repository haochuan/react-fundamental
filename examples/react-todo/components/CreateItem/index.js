import React from 'react';

import './style.css';

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onCreateItem = () => {
    this.props.createTodo(this.state.input);
    this.setState({ input: '' });
  };
  render() {
    return (
      <div className="CreateItem">
        <input
          className="CreateItem-input"
          onChange={this.onInputChange}
          value={this.state.input}
        />
        <button className="CreateItem-button" onClick={this.onCreateItem}>
          Create
        </button>
      </div>
    );
  }
}

export default CreateItem;
