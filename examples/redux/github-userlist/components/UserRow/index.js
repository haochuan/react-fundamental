import React from 'react';

const UserRow = props => {
  return (
    <tr
      style={{ cursor: 'pointer' }}
      onClick={props.getUserDetail.bind(this, props.user.login)}
    >
      <td>{props.user.login}</td>
      <td>{props.user.id}</td>
      <td>
        <img style={{ hight: 50, width: 50 }} src={props.user.avatar_url} />
      </td>
    </tr>
  );
};

export default UserRow;
