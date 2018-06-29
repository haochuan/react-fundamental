# Q & A

### More about `withRouter`

* Every component which is in `Route`s component props has three more props by default: `match` , `location`, `history`.

```js
<Route path="/" component={Home} />
```

* If we using the `render` syntax, the component won't have those three props, you have to use `withRouter` to get that.

```js
<Route path="/" render={() => <Home />} />
```

* For other components, use `withRouter` will give that component `history` and the **closest** `match` and `location`;

```js
import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

/* Home component */
const Home = props => {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
};

/* About component */
const About = props => {
  console.log('props in About:');
  console.log(props);
  return (
    <div>
      <h2>About</h2>
      <WithRouterButton />
    </div>
  );
};

/* Users component */
const Users = props => {
  console.log('props in User:');
  console.log(props);
  return (
    <div>
      <h2>User</h2>
      <WithRouterButton />
    </div>
  );
};

const Button = props => {
  console.log('props in Button:');
  console.log(props);
  return <button>Button</button>;
};

const WithRouterButton = withRouter(Button);

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
        </div>
      </BrowserRouter>
    );
  }
}
```

---

### The Refresh problem with React router

We had this issue before that React won't keep its previous state/data after refreshing the page:

```js
import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  withRouter,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

/* Admin component */
const Admin = () => (
  <div>
    <h2>Admin Page - After login</h2>
  </div>
);

class Login extends Component {
  componentDidMount() {
    if (this.props.authenticated) {
      this.props.history.push('/');
    }
  }
  login = () => {
    this.props.loginHandler();
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h2>Login Page</h2>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
class Home extends Component {
  componentDidMount() {
    if (!this.props.authenticated) {
      this.props.history.push('/login');
    }
  }
  render() {
    return <Admin />;
  }
}

const WithRouterLogin = withRouter(Login);
const WithRouterHome = withRouter(Home);

/* App component */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }
  loginHandler = () => {
    this.setState({authenticated: true});
  };
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <WithRouterHome authenticated={this.state.authenticated} />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <WithRouterLogin
                  authenticated={this.state.authenticated}
                  loginHandler={this.loginHandler}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
```

Sometimes we still want React to keep its previous state or data after refreshing the page. We can use `localStorge` to solve this problem.

* `localStorage.getItem()`
* `localStorage.setItem()`
* `localStorage.removeItem()`

**NOTE**: localStorage can only store strings.

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }
  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('reactState')) || {};
    if (state.authenticated) {
      this.setState({authenticated: state.authenticated});
    }
  }
  loginHandler = () => {
    this.setState({authenticated: true});
    localStorage.setItem('reactState', JSON.stringify({authenticated: true}));
  };
}
```

For a better code structure and the reusable concept, we can write localstorage load and save functions in another file and import them to use.

```js
// /src/utils/localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // do error handling here
  }
};
```

---

### Using `history.push()` with component lifecycle method

We got the question that the way we handle the redirect using `history.push()` has a bug: use will still see the admin page first even if the page will be redirected to `/login` within a very short time.

* It's a bad idea to use `history.push()` inside `constructor()` and `render()`.
* Good use case for `<Redirect>`.

```js
class Login extends Component {
  login = () => {
    this.props.loginHandler();
    this.props.history.push('/');
  };
  render() {
    if (this.props.authenticated) {
      return <Redirect to={{pathname: '/'}} />;
    } else {
      return (
        <div>
          <h2>Login Page</h2>
          <button onClick={this.login}>Login</button>
        </div>
      );
    }
  }
}
class Home extends Component {
  render() {
    return this.props.authenticated ? (
      <Admin />
    ) : (
      <Redirect to={{pathname: '/login'}} />
    );
  }
}
```

---

### Refactor code for API calls

Original:

```js
import React, {Component} from 'react';
import axios from 'axios';

/* App component */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
  }
  componentDidMount() {
    axios.get('http://api.haochuan.io/github/users').then(res => {
      console.log(res.data);
      this.setState({list: res.data});
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((item, index) => {
            return <li key={index}>{item.login}</li>;
          })}
        </ul>
      </div>
    );
  }
}
export default App;
```

Better way:

Write all api call logic into another file, suppose we have `src/api/index.js`:

```js
import axios from 'axios';

const URL = 'http://api.haochuan.io';

export const getUsers = () => {
  return axios({method: 'get', url: `${URL}/github/users`});
};
```

In `App.js`:

```js
import React, {Component} from 'react';
import {getUsers} from '../../api';

/* App component */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {list: []};
  }
  componentDidMount() {
    getUsers().then(res => {
      this.setState({list: res.data});
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((item, index) => {
            return <li key={index}>{item.login}</li>;
          })}
        </ul>
      </div>
    );
  }
}
export default App;
```
