# Navigation

Think about this first:

Before we talked about we can use the component `<Link>` from react router to go to a specific URL. However, in most of the real world projects, we have to handle the URL navigation inside a function:

One perfect example is that: when you click the login button in a website on `/login`, the code will send a HTTP request to check if your login information is valid, then redirect you to a new page like `/`.

```js
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* Login component */
const Login = () => (
  <div>
    <h2>Login</h2>
    <button onClick={() => {}}>Login</button>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}
```

---

### History

The [`history`](https://github.com/ReactTraining/history) package is one the only two major dependencies of React Router. It is a JavaScript library that lets you easily manage session history anywhere JavaScript runs.

With `history`, you can navigate across your browser history stack easily:

* history.push(path, [state]) - (function) Pushes a new entry onto the history stack
* history.goBack() - (function) go back one page
* history.goForward() - (function) go forward one page

---

### How to get history

Every component which is in Routes component props has three more props by default: match , location, history.

```js
<Route path="/" component={Home} />
```

If we using the render syntax, the component won't have those three props, you have to use withRouter to get that.

```js
<Route path="/" render={() => <Home />} />
```

Use withRouter will give component history and the closest match and location;

```js
import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

/* Home component */
const Home = props => {
  console.log('props in Home:');
  console.log(props);
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
      <Button />
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

### Exmaple 1 - Component in `<Route>`

```js
import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* Login component */
const Login = props => {
  console.log(props);
  return (
    <div>
      <h2>Login</h2>
      <button
        onClick={() => {
          props.history.push('/');
        }}>
        Login
      </button>
    </div>
  );
};

const WithRouterLogin = withRouter(Login);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={WithRouterLogin} />
        </div>
      </BrowserRouter>
    );
  }
}
```

---

### Exmaple 2 - Other Component

```js
import React, {Component} from 'react';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Button = props => {
  return (
    <button
      onClick={() => {
        props.history.push('/');
      }}>
      Login
    </button>
  );
};

const WithRouterButton = withRouter(Button);

/* Login component */
const Login = props => {
  console.log(props);
  return (
    <div>
      <h2>Login</h2>
      <WithRouterButton />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}
```
