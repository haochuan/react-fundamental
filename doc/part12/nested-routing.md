# Nested Routing

In previous example we created routes for `/`, `/users` and `/about`. What if we want a route to handle urls like `/users/:userId`?

In React Router, the nested routes should go inside the parent component. In this example, `<Users>` component should be the parent and we need to declare the route for `/users/:userId` inside `<Users>` component.

### match

Before the nested routing, first of all we need a way to get the path parameter inside the component. For example, suppose we already defined a route `/:pageName` to render the component `<AnotherPage>`, how can we get the path parameter inside of `<AnotherPage>` component?

If the router’s path and the location are successfully matched, an object is created and we call it the match object in props of the component. The match object carries more information about the URL and the path.

* match.url. A string that returns the matched portion of the URL. This is particularly useful for building nested`<Link>`s
* match.path. A string that returns the route’s path string — that is, `<Route path="">`. We’ll be using this to build nested `<Route>`s.
* match.isExact. A boolean that returns true if the match was exact (without any trailing characters).
* match.params. An object containing key/value pairs from the URL parsed by the Path-to-RegExp package.

### location

Locations represent where the app is now, where you want it to go, or even where it was. It is also a place for you to get query parameters from URL.

* location.search

```js
/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* AnotherPage component */
const AnotherPage = ({match, location}) => {
  console.log(match);
  console.log(location);
  return (
    <div>
      <h2>Another Page</h2>
      <p>match.url: {match.url}</p>
      <p>match.path: {match.path}</p>
      <p>match.params: {JSON.stringify(match.params)}</p>
    </div>
  );
};

/* App component */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/:pageName" component={AnotherPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
```

---

### Another way to render Route

We already know in order to render a `<Route>`, we need to pass a React component to it's `component` props to tell the Route what to render. We can also use `<Route>`'s render props to render component. The render prop expects a function that returns an element when the location matches the route’s path.

```js
/* AnotherPage component */
const AnotherPage = ({match}) => (
  <div>
    <p>match.url: {match.url}</p>
  </div>
);

/* App component */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/:pageName" component={AnotherPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

// ------ OR ------

/* App component */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route
              path="/:pageName"
              render={props => <p>match.url: {props.match.url}</p>}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
```

---

# Nested Routes

First, we’ve declared a couple of links for the nested routes. As previously mentioned, `match.url` will be used for building nested links and `match.path` for nested routes. If you’re having trouble understanding the concept of match, `console.log(match)` provides some useful information that might help to clarify it.

Instead of hard-coding the routes, we’ve used a variable within the pathname. `:userId` is a path parameter and catches everything after `users/` until another forward slash is encountered. So, a pathname like users/1 will create a params object as follows:

```js
{
  userId: 1;
}
```

The captured data should be accessible at `match.params`.

```js
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

/* Users component */
const Users = ({match}) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}/1`}>go to user 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/2`}>go to user 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/3`}>go to user 3</Link>
        </li>
      </ul>
      <Route
        path={`${match.path}/:userId`}
        render={({match}) => (
          <div>
            <h3> {match.params.userId} </h3>
          </div>
        )}
      />
    </div>
  );
};

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
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/users" component={Users} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
```
