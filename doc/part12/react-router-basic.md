# React Router Basic

React is a popular library for creating single-page applications (SPAs) that are rendered on the client side. An SPA might have multiple views (aka pages), and unlike the conventional multi-page apps, navigating through these views shouldn’t result in the entire page being reloaded. Instead, we want the views to be rendered inline within the current page.

Routing is the process of keeping the browser URL in sync with what’s being rendered on the page. React Router lets you handle routing declaratively. The declarative routing approach allows you to control the data flow in your application, by saying “the route should look like this”:

```js
<Route path="/about" component={About} />
```

### Installation

React Router has been broken into three packages: react-router, react-router-dom, and react-router-native.

You should almost never have to install react-router directly. That package provides the core routing components and functions for React Router applications. The other two provide environment specific (browser and react-native) components.

```js
npm install react-router-dom --save
```

---

### Router

There are two types of router in `react-router-dom`: the `<BrowserRouter>` and `<HashRouter>`. The `<BrowserRouter>` should be used when you have a server that will handle dynamic requests (knows how to respond to any possible URI), while the `<HashRouter>` should be used for static websites (can only respond to requests for files that it knows about). Usually it is preferable to use a `<BrowserRouter>`.

```
// <BrowserRouter>
http://example.com/about
http://example.com/users

// <HashRouter>
http://example.com/#/about
http://example.com/#/users
```

---

### Route

The `<Route>` component is the most important component in React router. It renders some UI if the current location matches the route’s path. Ideally, a <Route> component should have a prop named path, and if the pathname is matched with the current location, it gets rendered.

Suppose we already have `<Home>`, `<About>`, `<User>` three React components defined:

* You want to see the page rendering `<Home>` component if you go to the url `/`
* You want to see the page rendering `<About>` component if you go to the url `/about`
* You want to see the page rendering `<User>` component if you go to the url `/user`

```js
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        /* Route components are rendered if the path prop matches the current
        URL */
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/user" component={User} />
      </div>
    );
  }
}
```

---

### Link

The `<Link>` component is used to navigate between pages. It’s comparable to the HTML anchor element. However, using anchor links would result in a browser refresh, which we don’t want. So instead, we can use <Link> to navigate to a particular URL and have the view re-rendered without a browser refresh.

```js
<Link to="/">Home</Link>
<Link to="/about">About</Link>
<Link to="/user">User</Link>
```

In the example:

* We use the `<Link>` component to create a simple text UI, set "/" as the value of the `to` props, which will make the page go to `/` if you click it.
* We use the `<Link>` component to create a simple text UI, set "/about" as the value of the `to` props, which will make the page go to `/about` if you click it.
* We use the `<Link>` component to create a simple text UI, set "/user" as the value of the `to` props, which will make the page go to `/user` if you click it.

---

### Demo

```js
import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* About component */
const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

/* User component */
const User = () => (
  <div>
    <h2>User</h2>
  </div>
);

/* App component */
class App extends Component {
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
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/user">User</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/user" component={User} />
        </div>
      </BrowserRouter>
    );
  }
}
```

You will notice that there is a little bug in this demo: When you click `About` or `User`, you can still see the text Home in the UI. This is because `/about` matches both `/` and `/about` and `/user` matches both `/` and `/user`. That's why you will see the extra "Home" text. If you want to avoid that and want a route to be rendered only if the path is exactly the same, you should use the `exact` props in `<Route>`.

```js
<Route exact={true} path="/" component={Home} />
<Route path="/about" component={About} />
<Route path="/user" component={User} />
```
