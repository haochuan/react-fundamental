import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

function List(props) {
  const imageStyle = { width: 50, height: 50 };
  return (
    <tr style={{ cursor: 'pointer' }} onClick={props.handleClick}>
      <td>{props.id}</td>
      <td>{props.login}</td>
      <td>
        <img style={imageStyle} src={props.avatar_url} alt={props.avatar_url} />
      </td>
    </tr>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    // remember that you have to initialize the same data type for the result you want to get in state
    this.state = { data: [], current: {} };
  }
  componentWillMount() {
    // componentWillMount is the right place to get some data to render the page
    axios({ method: 'get', url: 'https://api.github.com/users' })
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(err => {
        alert(err);
      });
  }
  handleClick = username => {
    axios({ method: 'get', url: `https://api.github.com/users/${username}` })
      .then(response => {
        this.setState({ current: response.data });
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    return (
      <div>
        <div style={{ width: '40%', float: 'left' }}>
          <h3>List</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>username</th>
                <th>image</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, index) => {
                return (
                  <List
                    key={item.id}
                    {...item}
                    handleClick={this.handleClick.bind(this, item.login)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ width: '60%', float: 'right' }}>
          <h3>Detail:</h3>
          <div style={{ width: 400, height: 400, border: '1px solid black' }}>
            {this.state.current.name ? (
              <div>
                <p>name: {this.state.current.name}</p>
                <p>location: {this.state.current.location}</p>
                <p>Following: {this.state.current.following}</p>
                <p>followers: {this.state.current.followers}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
