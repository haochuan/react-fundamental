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
