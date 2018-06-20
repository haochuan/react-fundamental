# Handling Events

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

* React events are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

### onClick Event

```js
class HelloWorld extends React.Component {
  showAlert() {
    console.log(this); // undefined
    alert('hello');
  }
  render() {
    return <button onClick={this.showAlert}>Click Me</button>;
  }
}
```

**NOTE: If you are going to define a new function inside a react component, please use the arrow function shown as below:**

```js
class HelloWorld extends React.Component {
  showAlert = () => {
    console.log(this); // HelloWorld component itself
    alert('hello');
  };
  render() {
    return <button onClick={this.showAlert}>Click Me</button>;
  }
}
```

**If you still prefer the old way, you have to bind `this` every time when you pass it as an event handler.**

```js
class HelloWorld extends React.Component {
  showAlert() {
    console.log(this); // HelloWorld component ifself
    alert('hello');
  }
  render() {
    return <button onClick={this.showAlert.bind(this)}>Click Me</button>;
  }
}
```

---

### onChange event

```js
class HelloWorld extends React.Component {
  // e is the event, here should be a `onChange` event
  // e.target is the where the event is happening
  // e.target.value is the value of the element where the event is happening
  showInput = e => {
    console.log(e.target.value);
  };
  render() {
    return <input onChange={this.showInput} />;
  }
}
```

---

### Other Events

For the whole list of available events in React, check the link here: https://reactjs.org/docs/events.html#reference
