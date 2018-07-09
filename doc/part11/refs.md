# Refs

### What is Refs

Refs provide a way to access DOM nodes or React elements created in the render method.

---

### How to use Refs

```js
import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.numberComponent = React.createRef();
  }

  render() {
    console.log(this.inputBox);
    console.log(this.numberComponent);
    return (
      <div>
        <input />
        <hr />
        <input ref={this.inputBox} />
        <hr />
        <Number number={1} ref={this.numberComponent} />
      </div>
    );
  }
}

class Number extends Component {
  render() {
    return <div>{this.props.number}</div>;
  }
}

render(<App />, document.getElementById('root'));
```

---

### When to use Refs

There are a few good use cases for refs:

* Managing focus, text selection, or media playback.
* Triggering imperative animations.
* Integrating with third-party DOM libraries.

**Avoid using refs for anything that can be done declaratively.**

---

Read the official doc for more details: https://reactjs.org/docs/refs-and-the-dom.html
