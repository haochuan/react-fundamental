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

**IMPORTANT: Instead of writing two components in a single file, we usually prefer one component per file:**

Suppose we design the Text component in a separate file `Text.js`:

```js
// Text.js
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

export default Text;
```

And in order to use the Text component in our main component, we just need to import Text component:

```js
import React, {Component} from 'react';
import Text from './Text.js';

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

---

### PropTypes

As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:

Before we use `React.PropTypes` to do the typechecking. Since React v15.5, it has been moved into a different package called `prop-types`.

To insatll `prop-types`:

```
npm install prop-types --save
```

Example:

```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextA extends Component {
  render() {
    return <p>Hello, {this.props.text}</p>;
  }
}

const TextB = props => {
  return <p>Hello, {props.text}</p>;
};

TextA.propTypes = {
  text: PropTypes.string,
};

TextB.propTypes = {
  text: PropTypes.string,
};
```

Here is a list of all available types:

```js
MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,
```
