# Q & A

Here is a list of the most common question and the most confusing part people will have based on my experience.

### Do we really need to split a single HTML element into a tiny React component?

You don't need to that for most of the cases, unless there is a specific reason.

---

### What is the best way to struture the code for a React project?

* Use directory for component, and use `index.js` as the entry point.
* Make every component fully seperated.
* Make component reusable.

---

### How to use other React libraries in my React project?

* UI
  * https://material-ui.com
  * https://react-bootstrap.github.io
  * https://ant.design
* Animation
  * http://react-spring.surge.sh
* Charts
  * http://recharts.org/#/en-US/
  * https://github.com/hshoff/vx
* Other
  * https://github.com/mzabriskie/react-draggable
  * https://github.com/casesandberg/react-color

---

### How to update immutable state

Suppose we are building a todo app. We have an array `todos` to store all the todo list, and we have a function `addTodo` to add a new todo:

```js
import React, {Component, PureComponent} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  addTodo = () => {
    this.setState({todos: this.state.todos.push('hello')});
  };
  render() {
    return (
      <div>
        <button onClick={this.addTodo}>Add New</button>
        <ul>
          {this.state.todos.map((item, index) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
```

Why it's not working?

* You can not modify state directly. In the other word, you have to assign `todos` to a new array instead of modifying the old `todos` itself.
* `Array.push()` will return the length of the new array

---

### Best way to initialize state in React component

```js
// first way
class A extends Component {
  state = {number: 1};
}

// second way
class B extends Component {
  constructor(props) {
    super(props);
    this.state = {number: 1};
  }
}
```

* No difference for most of the time.
* The first syntax is in a further stage of ECMAScript, so that it's unstable when comparing with the second one.
  * http://kangax.github.io/compat-table/es6
  * https://babeljs.io/docs/en
* All the official doc uses the second way
* Although we use the same syntax to define functiosn inside component, state is a little special.
* Based on those points, you are not required to use a specific one. But personally I recommand the second one.

---

### What will trigger re-rendering for React Component?

Only state change will trigger componnet re-rendering. Pure props changes cannot trigger re-rendering.

```js
import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
  number = 1;
  componentDidMount() {
    setInterval(() => {
      console.log(this.number);
      this.number++;
    }, 1000);
  }
  render() {
    return <Number number={number} />;
  }
}

const Number = ({number}) => <div>{number}</div>;

render(<App />, document.getElementById('root'));
```
