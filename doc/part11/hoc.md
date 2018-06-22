# High Order Component

A higher-order component is a function that takes a component and returns a new component, for the concept of resuable component.

### High Order Component Pattern

```js
import React, {Component} from 'react';

const higherOrderComponent = OldComponnet => {
  class NewComponent extends Component {
    render() {
      return <OldComponnet />;
    }
  }
  return NewComponent;
};
```

---

### Basic Example

We need to share some common values across a number of component.

Bad way:

```js
import React, {Component} from 'react';

const A = props => {
  return (
    <div>
      <A1 number={props.number} foo={this.foo} bar={this.bar} />
      <A2 number={props.number} foo={this.foo} bar={this.bar} />
      <A3 number={props.number} foo={this.foo} bar={this.bar} />
    </div>
  );
};

const B = props => {
  return <p>{props.number}</p>;
};

const C = props => {
  return <p>{props.number}</p>;
};

const A1 = props => {
  return <p>{props.number}</p>;
};

const A2 = props => {
  return <p>{props.number}</p>;
};

const A3 = props => {
  return <p>{props.number}</p>;
};

class App extends Component {
  state = {number: 10};
  foo = () => {
    console.log('foo');
  };
  bar = () => {
    console.log('foo');
  };
  render() {
    const {number} = this.state;
    return (
      <div>
        <A number={number} foo={this.foo} bar={this.bar} />
        <B number={number} foo={this.foo} bar={this.bar} />
        <C number={number} foo={this.foo} bar={this.bar} />
      </div>
    );
  }
}
```

Use HOC:

```js
const withNumberAndFunctions = OldComponent => {
  class NewComponent extends Component {
    foo = () => {
      console.log('foo');
    };
    bar = () => {
      console.log('foo');
    };
    render() {
      const number = 10;
      return <OldComponent foo={this.foo} bar={this.bar} number={number} />;
    }
  }
  return NewComponent;
};

const A1 = props => {
  return <p>{props.number}</p>;
};

const A2 = props => {
  return <p>{props.number}</p>;
};

const A3 = props => {
  return <p>{props.number}</p>;
};

const A = props => {
  return (
    <div>
      <WrappedA1 />
      <WrappedA2 />
      <WrappedA3 />
    </div>
  );
};

const B = props => {
  return <p>{props.number}</p>;
};

const C = props => {
  return <p>{props.number}</p>;
};

const WrappedA1 = withNumberAndFunctions(A1);

const WrappedA2 = withNumberAndFunctions(A2);

const WrappedA3 = withNumberAndFunctions(A3);

const WrappedB = withNumberAndFunctions(B);

const WrappedC = withNumberAndFunctions(C);

class App extends Component {
  render() {
    return (
      <div>
        <A />
        <WrappedB />
        <WrappedC />
      </div>
    );
  }
}
```
