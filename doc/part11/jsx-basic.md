# JSX Basic

Building a React project involves creating one or more React components that can interact with each other. A React component is simply a JavaScript class that requires the render function to be declared. The render function simply outputs HTML code, which is implemented using either JSX. A React component may also require additional functions for handling data, actions and lifecycle events.

React uses JSX syntax for templating the view instead of regular Javascript. It is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

* React uses JSX for templating instead of regular JavaScript.
* It is also type-safe and most of the errors can be caught during compilation.
* It makes it easier and faster to write templates, if you are familiar with HTML.

### Using JSX

JSX looks like a regular HTML in most cases:

```js
import React, {Component} from 'react';

class App extends Component {
  render() {
    return <div>Hello World!!!</div>;
  }
}
```

Even though it's similar to HTML, there are a couple of things we need to keep in mind when working with JSX.

---

### The only place to use JSX is in the return of the render function inside a react component.

```js
import React, {Component} from 'react';

class App extends Component {
  render() {
    // you can write any javascript out of the return
    return <div>Hello World!!!</div>;
  }
}
```

---

### You must have a 'container'

If we want to return more elements, we need to wrap it with one container element. Notice how we are using div as a wrapper for h1, h2 and p elements.

```js
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Header</h1>
        <h2>Content</h2>
        <p>This is the content!!!</p>
      </div>
    );
  }
}
```

If there is no parent container like below, React will throw en error:

```js
class App extends React.Component {
   render() {
      return (
        <h1>Header</h1>
        <h2>Content</h2>
        <p>This is the content!!!</p>
      );
   }
}
```

---

### The HTML Tag have to be closed

JSX requires that every tag should be closed:

```html
<h1>Header</h1>

<div></div>

<div />
```

Below is an example of an unclosed tag and you can not use that in JSX:

```html
<br>
```

---

### Different XHL Attributes Names

Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.

For example, class becomes className in JSX, and tabindex becomes tabIndex.

```js
class App extends React.Component {
  render() {
    return <p className="red">Hello World.</p>;
  }
}
```

For the whole list of the differences, see here: https://reactjs.org/docs/dom-elements.html

---

### Embedding Javascript Expressions in JSX

You can embed any JavaScript expression in JSX by wrapping it in curly braces.

```js
class App extends React.Component {
  render() {
    return <p>{1 + 1}</p>;
  }
}
```

```js
function sum(a, b) {
  return a + b;
}
class App extends React.Component {
  render() {
    return <p>{sum(1, 2)}</p>;
  }
}
```

**NOTE: You can not use Javascript expresssions that require curly braces in syntax, like `if`, `for`, `while`, `switch`.**

```js
class App extends React.Component {
  render() {
    return <p>
      {
        if (2 > 1) {
          ...
        } else {
          ...
        }
      }
    </p>;
  }
}
```

But we can use confitional expressions:

```js
class App extends React.Component {
  render() {
  const name = 'haochuan',
    return <p>
      {name.length > 5 ? 'The name has more that 5 chars' : 'The name has less than 5 chars'}
    </p>;
  }
}
```

---

### Inline Style

The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string.

```js
class App extends React.Component {
  render() {
    const textStyle = {
      color: '#000',
      // React will automatically append a “px” suffix to certain numeric inline style properties.
      // or you can just use string '20px' as the value
      marginLeft: 20,
    };
    return <p style={textStyle}>Hello World.</p>;
  }
}
```

**NOTE: Some examples in the documentation use style for convenience, but using the style attribute as the primary means of styling elements is generally not recommended. In most cases, className should be used to reference classes defined in an external CSS stylesheet.**
