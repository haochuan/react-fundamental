import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
  width: '50%',
  float: 'left'
};

class UserDetail extends Component {
  render() {
    const { currentUser } = this.props;
    let currentUserUI;
    if (currentUser.isLoading) {
      currentUserUI = <p>Loading</p>;
    } else if (currentUser.error !== '') {
      currentUserUI = <p style={{ color: 'red' }}>{currentUser.error}</p>;
    } else if (currentUser.data.id) {
      currentUserUI = (
        <ul>
          <li>Name: {currentUser.data.name}</li>
          <li>Location: {currentUser.data.location}</li>
          <li>Public Repos: {currentUser.data.public_repos}</li>
          <li>Followers: {currentUser.data.followers}</li>
        </ul>
      );
    }
    return (
      <div style={style}>
        <h3>User Detail</h3>
        {currentUserUI}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(UserDetail);
