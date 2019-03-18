# Refs

### What is Refs

Refs provide a way to access DOM nodes or React elements created in the render method.

---

### How to use Refs

```js
import React, { Component } from 'react';
import { render } from 'react-dom';

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

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

**Avoid using refs for anything that can be done declaratively.**

---

Read the official doc for more details: https://reactjs.org/docs/refs-and-the-dom.html

### Example of modifying text

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state = { text: '' };
  }

  render() {
    return (
      <div>
        <textarea
          ref={this.editor}
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <button
          onClick={() => {
            const textareaElem = this.editor.current;
            const selectionStart = textareaElem.selectionStart;
            const selectionEnd = textareaElem.selectionEnd;
            if (selectionStart === selectionEnd) {
              // no selection, just concat
              this.setState({ text: this.state.text + 'Hello World' });
            } else {
              this.setState({
                text:
                  this.state.text.slice(0, selectionStart) +
                  'Hello World' +
                  this.state.text.slice(selectionEnd + 1)
              });
            }
            textareaElem.focus();
          }}
        >
          Insert
        </button>
      </div>
    );
  }
}
```
