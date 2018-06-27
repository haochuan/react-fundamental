# Protected Routes

Next we are going to talk about protected routes. If someone tries to access /admin, they’d be required to log in first. However, there are some things we need to cover before we can protect routes.

### Redirect

`<Redirect>` will replace the current location in the history stack with a new location. The new location is specified by the `to` prop. Here’s how we’ll be using `<Redirect>.`

```js
<Redirect to={{pathname: '/login', state: {from: props.location}}} />
```

So, if someone tries to access the /admin while logged out, they’ll be redirected to the /login route. The information about the current location is passed via state, so that if the authentication is successful, the user can be redirected back to the original location. Inside the child component, you can access this information at this.props.location.state.

Think about the basic example below, suppose that you defined one React route `/login`, and if user tries go to `/`, the page will be redirect to `/login`.

```js
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

/* Login component */
const Login = props => {
  console.log('location in Login');
  console.log(props.location);
  return (
    <div>
      <h2>Login Page</h2>
    </div>
  );
};

/* Home component */
const Home = props => {
  console.log('location in Home');
  console.log(props.location);
  return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
};

/* App component */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
```

---

### Protected Routes

So after we know how to use `<Redirect>`, let's take a look how to write a protected route.

```js
/* Admin component */
const Admin = () => (
  <div>
    <h2>Admin Page - After login</h2>
  </div>
);

/* Login component */
const Login = props => {
  if (props.authenticated) {
    return <Redirect to={{pathname: '/'}} />;
  } else {
    return (
      <div>
        <h2>Login Page</h2>
        <button onClick={props.loginHandler}>Login</button>
      </div>
    );
  }
};

/* Home component */
const Home = props => {
  if (props.authenticated) {
    return <Admin />;
  } else {
    return <Redirect to={{pathname: '/login'}} />;
  }
};

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
              render={() => <Home authenticated={this.state.authenticated} />}
            />
            <Route
              path="/login"
              render={() => (
                <Login
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

---

### Use `history.push()` for protected route

Instead of using `<Redirect />` to protect routes, we can also use `history.push()`.

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

* Why we need a extra login function inside `<Login>`?
* Why we need to use withRouter?
* Why we did not use `<Route path="/" component={Home} />`?
