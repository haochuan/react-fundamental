# Context API with HOC

### Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

**NOTE**: Don’t use context just to avoid passing props a few levels down. Stick to cases where the same data needs to be accessed in many components at multiple levels.

```js
const {Provider, Consumer} = React.createContext(defaultValue);

<Provider value={/* some value */}>

<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```

---

### Context with HOC

Some types of contexts are consumed by many components (e.g. theme or localization). It can be tedious to explicitly wrap each dependency with a `<Context.Consumer>` element. A higher-order component can help with this.

`<App>` contains `<Layout>`, `<Layout>` contains `<Header>`, `<Content>` and `<Footer>`. We need to pass the user object from `<App>` to `<Header>` and `<Footer>`.

```js
import React, {Component} from 'react';
import {render} from 'react-dom';

const Header = props => (
  <div style={{height: 200}}>
    {props.user ? `Hello, ${props.user.username}` : 'Welcome'}
  </div>
);

const Content = props => <div style={{height: 400}}>{props.children}</div>;
const Footer = props => (
  <div>{props.user ? `Footer for ${props.user.username}` : `Footer`}</div>
);

// We need to get access to user object inside Header
//
const {Provider, Consumer} = React.createContext({});

const withUser = OldComponent => {
  const WithUser = props => {
    return (
      <Consumer>
        {user => {
          console.log(user);
          return <OldComponent {...props} user={user} />;
        }}
      </Consumer>
    );
  };
  return WithUser;
};

const WithUserHeader = withUser(Header);
const WithUserFooter = withUser(Footer);
const Layout = props => (
  <div>
    <WithUserHeader />
    <Content {...props} />
    <WithUserFooter />
  </div>
);

class App extends Component {
  state = {user: {username: 'foo', id: 1}};
  render() {
    return (
      <Provider value={this.state.user}>
        <Layout>
          <div>This is content.</div>
        </Layout>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
```
