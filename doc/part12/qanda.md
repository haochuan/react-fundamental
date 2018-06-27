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
