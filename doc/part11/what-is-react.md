# What is React.js

> A JavaScript library for building user interfaces

* Declarative
  React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

* Component-Based
  Build encapsulated components that manage their own state, then compose them to make complex UIs.

* Learn Once, write anywhere
  You can easily develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps and desktop apps.

### What is React

React is a JavaScript library. It’s not a framework. It’s not a complete solution and we’ll often need to use more libraries with React to form any solution. React does not assume anything about the other parts in any full solution. It focuses on just one thing, and on doing that thing very well.

The thing that React does really well is the second part of the definition: building User Interfaces. A User Interface is anything we put in front of users to have them interact with a machine. User Interfaces are everywhere, from the simple buttons on a microwave to the dashboard of a space shuttle. If the device we’re trying to interface can understand JavaScript, we can use React to describe a User Interface for it.

---

### Why React

Although React is a relative new library in the front end world, it has been proven to be a easy, fast and efficient way to write web UI.

Thousands of companies worldwide are using React, including big names such as Netflix and AirBnB. React has become extremely popular, such that a number of apps have been ported to React — including WhatsApp, Instagram and Dropbox.

* Working with the DOM API is hard. React basically gives developers the ability to work with a virtual browser that is more friendly than the real browser. React’s virtual browser acts like an agent between the developer and the real browser.

* React enables developers to declaratively describe their User Interfaces and model the state of those interfaces. This means instead of coming up with steps to describe transactions on interfaces, developers just describe the interfaces in terms of a final state (like a function). When transactions happen to that state, React takes care of updating the User Interfaces based on that.

* React is just JavaScript, there is a very small API to learn, just a few functions and how to use them. After that, your JavaScript skills are what make you a better React developer. There are no barriers to entry. A JavaScript developer can become a productive React developer in a few hours.

Since Web browsers understand JavaScript, we can use React to describe Web User Interfaces. I like to use the word describe here because that’s what we basically do with React, we just tell it what we want and React will build the actual User Interfaces, on our behalf, in the Web browser. Without React or similar libraries, we would need to manually build User Interfaces with native Web APIs and JavaScript.

When you hear the statement that “React is declarative,” this is exactly what it means, we describe User Interfaces with React and tell it what we want (not how to do it). React will take care of the “how” and translate our declarative descriptions (which we write in the React language) to actual User Interfaces in the browser. React shares this simple declarative power with HTML itself, but with React, we get to be declarative for HTML interfaces that represent dynamic data, not just static data.

---

### Virtual DOM

Before we get to coding, you need to be aware that React uses a Virtual DOM to handle page rendering. If you’re familiar with jQuery, you know that it can directly manipulate a web page via the HTML DOM. In a lot of use cases, this direct interaction poses little to no problems. However, for certain cases, such as the running of a highly interactive, real-time web application, performance often takes a huge hit.

To counter this, the concept of the Virtual DOM was invented, and is currently being applied by many modern UI frameworks including React. Unlike the HTML DOM, the Virtual DOM is much easier to manipulate, and is capable of handling numerous operations in milliseconds without affecting page performance.

---

### A Taste of React Syntax

```js
import React, {Component} from 'react';

class Button extends Component {
  render() {
    return <button>Click Me</button>;
  }
}
```
