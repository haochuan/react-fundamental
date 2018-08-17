# Connect create-react-app with express server

This is about how to make `create-react-app` work with your custom express backend.

There are a number of ways to achieve this goal. Here we will separate our frontend `create-react-app` and express backend entirely, which are running on different ports.

In this example, we will just have one react component which will dispatch an action to get a list of user from exprses backend and show the users in the UI.

---

### Define reducer

```js
const initState = {isFetching: false, data: [], err: null};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_FETCH_START':
      return {
        ...state,
        isFetching: true,
      };
    case 'USER_FETCH_FAIL':
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case 'USER_FETCH_SUCCESS':
      return {
        ...state,
        isFetching: false,
        err: null,
        data: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
```

---

### Define action creators

```js
import axios from 'axios';
function requestStart() {
  return {
    type: 'USER_FETCH_START',
  };
}
function requestSuccess(response) {
  return {
    type: 'USER_FETCH_SUCCESS',
    data: response.data,
  };
}
function requestFail(error) {
  return {
    type: 'USER_FETCH_FAIL',
    error,
  };
}
function getData() {
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get('/api/users')
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}

export default getData;
```

---

### Define Component

```js
import React, {Component} from 'react';
import {connect} from 'react-redux';

import getUserRequest from '../../actions';

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const {isFetching, data, err} = this.props.users;
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
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUserRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

---

### Express server

```js
const express = require('express');
const app = express();
const faker = require('faker');

const PORT = 4000;

function generateData(length = 10) {
  const data = [];
  for (let i = 0; i < length; i++) {
    const user = {
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
    };
    data.push(user);
  }
  return data;
}

app.get('/api/users', (req, res) => {
  const users = generateData(5);
  setTimeout(() => {
    res.status(200).json(users);
  }, 5000);
});

app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});
```

---

### Proxy in create-react-app

```js
{
  "name": "myapp",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.18.0",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-redux": "^5.0.7",
    "react-scripts": "1.1.4",
    "redux": "^4.0.0",
    "redux-thunk": "^2.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:4000/"
}
```

---

For full source code please see: https://github.com/haochuan/react-fundamental/tree/master/examples/connect-with-express
