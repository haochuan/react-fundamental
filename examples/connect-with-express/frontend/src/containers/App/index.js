import React, { Component } from 'react';
import { connect } from 'react-redux';

import getUserRequest from '../../actions';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { isFetching, data, err } = this.props.users;
    if (isFetching) {
      return <div>Loading the data....</div>;
    } else {
      if (err) {
        return <div>This was an error to get the data.</div>;
      } else {
        return (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <img src={user.image} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUserRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
