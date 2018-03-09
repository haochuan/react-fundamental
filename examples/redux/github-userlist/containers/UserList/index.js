import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/users';
import { getCurrentUser } from '../../actions/currentUser';

import UserRow from '../../components/UserRow';

const style = {
  width: '50%',
  float: 'right'
};

class UserList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUsers());
  }
  getUserDetail = username => {
    const { dispatch } = this.props;
    dispatch(getCurrentUser(username));
  };
  render() {
    const { users } = this.props;
    let usersUI;
    if (users.isLoading) {
      usersUI = <p>Loading</p>;
    } else if (users.error !== '') {
      usersUI = <p style={{ color: 'red' }}>{users.error}</p>;
    } else if (users.data.length !== 0) {
      usersUI = (
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>id</th>
              <th>image</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map(user => {
              return (
                <UserRow
                  key={user.id}
                  user={user}
                  getUserDetail={this.getUserDetail}
                />
              );
            })}
          </tbody>
        </table>
      );
    }
    return (
      <div style={style}>
        <h3>User List</h3>
        {usersUI}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(UserList);
