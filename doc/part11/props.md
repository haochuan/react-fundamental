# Component Props

Props is shorthand for properties, and Props are how components talk to each other by passing values around.

```js
import React, {Component} from 'react';

class Text extends Component {
  render() {
    console.log(this.props);
    // {
    //   text: "Hello World."
    // }
    return <p>{this.props.text}</p>;
  }
}

class App extends Component {
  render() {
    return <Text text="Hello World." />;
  }
}
```

If we use functional components:

```js
import React, {Component} from 'react';

function Text(props) {
  console.log(props);
  // {
  //   text: "Hello World."
  // }
  return <p>{props.text}</p>;
}
function App(props) {
  return <Text text="Hello World." />;
}
```

You can pass different props as many as you want, but please remember do not use any reserved words as the property name (className, etc.).

```js
import React, {Component} from 'react';

class Text extends Component {
  render() {
    console.log(this.props);
    // {
    //   stringProps: "I am a string",
    //   numberProps: 1,
    //   objectProps: {a: 1, b: 2, c: 3},
    //   arrayProps: [1, 2, 3, 4, 5]
    // }
    return <p>{this.props.text}</p>;
  }
}

class App extends Component {
  render() {
    const stringProps = 'I am a string';
    const numberProps = 1;
    const objectProps = {a: 1, b: 2, c: 3};
    const arrayProps = [1, 2, 3, 4, 5];
    return (
      <Text
        stringProps={stringProps}
        numberProps={numberProps}
        objectProps={objectProps}
        arrayProps={arrayProps}
      />
    );
  }
}
```
