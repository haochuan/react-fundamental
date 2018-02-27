# Conditional Rendering

In React, it is easy to decide what to render in the UI. Suppose your main component contains a lot of child components, you can render only some of them, depending on the state of your application.

### Traditional Javascript IF ELSE

```js
function UserGreeting(props) {
  return (
    <div>
      <h1>Welcome back!</h1>
      <button onClick={props.logoutHandler}>Logout</button>
    </div>
  );
}

function GuestGreeting(props) {
  return (
    <div>
      <h1>Please Log in.</h1>
      <button onClick={props.loginHandler}>Login</button>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }
  login = () => {
    this.setState({authenticated: true});
  };
  logout = () => {
    this.setState({authenticated: false});
  };
  render() {
    const {authenticated} = this.state;
    if (authenticated) {
      return <UserGreeting logoutHandler={this.logout} />;
    } else {
      return <GuestGreeting loginHandler={this.login} />;
    }
  }
}
```

---

### Inline Conditional Operator

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator condition ? true : false.

```js
function UserGreeting(props) {
  return (
    <div>
      <h1>Welcome back!</h1>
      <button onClick={props.logoutHandler}>Logout</button>
    </div>
  );
}

function GuestGreeting(props) {
  return (
    <div>
      <h1>Please Log in.</h1>
      <button onClick={props.loginHandler}>Login</button>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }
  login = () => {
    this.setState({authenticated: true});
  };
  logout = () => {
    this.setState({authenticated: false});
  };
  render() {
    const { authenticated } = this.state;
    return authenticated ? (
      <UserGreeting logoutHandler={this.logout} />
    ) : (
      <GuestGreeting loginHandler={this.login} />
    );
    }
  }
}
```

---

### Inline If with Logical && Operator

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false};
  }
  login = () => {
    this.setState({authenticated: true});
  };
  logout = () => {
    this.setState({authenticated: false});
  };
  render() {
    const {authenticated} = this.state;
    return (
      <div>
        <h1>Hello</h1>
        <h1>{authenticated && 'Welcome Back'}</h1>
        <h1>{!authenticated && 'Please Login'}</h1>
        <button onClick={authenticated ? this.logout : this.login}>
          {authenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    );
  }
}
```

Why this works: in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false. Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.
