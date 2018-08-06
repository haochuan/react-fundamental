# Pure Component

```js
import React, {Component} from 'react';

class App extends Component {}
class App extends React.Component {}

import React, {PureComponent} from 'react';

class App extends PureComponent {}
class App extends React.PureComponent {}
```

`PureComponent` is exactly the same as `Component` except that when props or state changes, `PureComponent` will do a shallow comparision on both props and state.

A shallow comparision check means that JS only checks that the value’s object ids are the same, not that their content is the same. The id here means the memory address for where JS stores the information for that particular object.

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

---

```js
import React, {Component, PureComponent} from 'react';

class Pure extends PureComponent {
  render() {
    console.log('pure component render() called');
    return (
      <div>
        <h3>Pure Component</h3>
        <p>{this.props.user.username}</p>
        <p>{this.props.user.id}</p>
        <button onClick={this.props.addOne}>Add One</button>
      </div>
    );
  }
}
class Regular extends Component {
  render() {
    console.log('component render() called');
    return (
      <div>
        <h3>Component</h3>
        <p>{this.props.user.username}</p>
        <p>{this.props.user.id}</p>
        <button onClick={this.props.addOne}>Add One</button>
      </div>
    );
  }
}

class App extends Component {
  state = {number: 1, user: {username: 'a', id: 1}};
  addOne = () => {
    this.setState({number: this.state.number + 1});
  };
  render() {
    const {user, number} = this.state;
    user.id = number;
    console.log('current user: ', user);
    return (
      <div>
        <Pure user={user} addOne={this.addOne} />
        <Regular user={user} addOne={this.addOne} />
      </div>
    );
  }
}
```
