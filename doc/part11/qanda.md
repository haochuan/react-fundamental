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

### Why we use immutable data in React?

Short answer: to have a better performance.

* There are two major types of equality check in Javascript: shallow equality check vs deep equality check.
* A shallow equility check means that JS only checks that the value’s object ids are the same, not that their content is the same. The id here means the memory affress for where JS stores the information for that particular object.
* A deep equality check means that JS will check if two values are exactly the same.

A primitive (primitive value, primitive data type) is data that is not an object and has no methods. In JavaScript, there are 6 primitive data types: string, number, boolean, null, undefined, symbol (new in ECMAScript 2015).

All primitives are immutable, i.e., they cannot be altered. It is important not to confuse a primitive itself with a variable assigned a primitive value. The variable may be reassigned a new value, but the existing value can not be changed in the ways that objects, arrays, and functions can be altered.

```js
// Using a string method doesn't mutate the string
var bar = 'baz';
console.log(bar); // baz
bar.toUpperCase();
console.log(bar); // baz

// Using an array method mutates the array
var foo = [];
console.log(foo); // []
foo.push('plugh');
console.log(foo); // ["plugh"]

// Assignment gives the primitive a new (not a mutated) value
bar = bar.toUpperCase(); // BAZ
```

In React, the render function will be called if there is any udpate in `state` or `props`. Think about how can we tell if there is an udpate or not.

* Deep check: loop all the data to see if there is any difference
* Shallow check: check if they are in the same memory location

```js
const data = [];
for (let i = 0; i < 100000; i++) {
  data.push(1);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data};
  }

  changeData = () => {
    this.state.data[4000] = 2;
  };

  changeDataTheBetterWay = () => {
    const data = this.state.data;
    data[4000] = 2;
    this.setState({data});
  };

  render() {
    //...
  }
}
```
