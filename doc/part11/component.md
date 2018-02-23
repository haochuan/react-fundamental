# Component

React components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

Building a React project involves creating one or more React components that can interact with each other. A React component is simply a JavaScript class that requires the render function to be declared. The render function simply outputs HTML code, which is implemented using either JSX. A React component may also require additional functions for handling data, actions and lifecycle events.

React components can further be categorized into containers/stateful components and stateless components. A stateless component’s work is simply to display data that it receives from its parent React component. It can also receive events and inputs, which it passes up to its parent to handle. A React container or stateful component does the work of rendering one or more child components. It fetches data from external sources and feeds it to its child components. It also receives inputs and events from them in order to initiate actions.

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

### Class Component

You can use an ES6 class to define a component:

```js
class HelloWorld extends React.Component {
  render() {
    return <h1>Hello World.</h1>;
  }
}
```

---

### Functional Component

Also you can use a simpler way to define a component:

```js
function HelloWorld(props) {
  return <h1>Hello World</h1>;
}
```

---

### Difference

The above two components are equivalent from React’s point of view.

However, Classes have some additional features that we will discuss in future sections.

---

### Rendering React Component

Once you have a react component, you need to render the component in order to see the result.

HTML:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

React:

```js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return <div>Hello World!!!</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

This is what will happen in this exmaple:

* We call ReactDOM.render() with the `<App />` component, to render `<App />` inside `<div id="root"></div>`.
* Our App component returns a `<div>Hello World!!!</div>` as the result.
* React DOM efficiently updates the HTML DOM to match `<div>Hello World!!!</div>`.
