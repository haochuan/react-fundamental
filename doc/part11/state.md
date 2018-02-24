# State

The state of a React component is a place to store data inside the component. It is similar to a Javascript Object, but it is immutable.

A component's state should be considered as private data. This data is not exposed to the component that makes use of it. It is private and fully controlled by the component. It is only seen on the inside of component definitions. You can think of state as an internal data-set which affects the rendering of components.

Only Class Component has state, functional Component does not.

### Initialize state

In order to use state, we have the initialize it:

```js
class HelloWorld extends React.Component {
  // you need the construtor to init state
  constructor(props) {
    super(props); // You have to run this before you init state
    this.state = {};
  }
  render() {
    return <h1>Hello World.</h1>;
  }
}
```

---

### Default state

When you initialize the state, you can set the default state instead "empty":

```js
class HelloWorld extends React.Component {
  // you need the construtor to init state
  constructor(props) {
    super(props); // You have to run this before you init state
    this.state = {number: 1};
  }
  render() {
    return <h1>Hello World.</h1>;
  }
}
```

---

### Read state

You can read the state anywhere inside the component by `this.state`:

```js
class HelloWorld extends React.Component {
  // you need the construtor to init state
  constructor(props) {
    super(props); // You have to run this before you init state
    this.state = {number: 1};
  }
  render() {
    console.log(this.state); // {number: 1}
    return <h1>{this.state.number}</h1>;
  }
}
```

---

### Set state

Since the state is immutable, we can not set the value like what used to do for Javascript Object. Instead, we have a special function called `setState` to help us set the state:

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {number: 1};
  }
  addOne = () => {
    this.setState({number: this.state.number + 1});
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.addOne}>Add One</button>
      </div>
    );
  }
}
```

**NOTE: The spread operator will be used a lot with React, especially inside `setState`**

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {one: 1, two: 2, three: 3};
  }
  changeState = () => {
    this.setState({...this.state, one: 111});
  };
  render() {
    return (
      <div>
        <p>{this.state.one}</p>
        <p>{this.state.two}</p>
        <p>{this.state.three}</p>
        <button onClick={this.changeState}>change</button>
      </div>
    );
  }
}
```

---
