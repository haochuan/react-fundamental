# Webpack Basic

This section aims to give you a little taste of what is happening behind the scene in order to run your React code inside browsers at a very high level. If you are using `create-react-app`, you do not need to worry about anything we will talk about here since `create-react-app` has already done all the configuration for you. This topic can go much deeper, but that is not the requirement for this course and what we should be focused on.

Before we jupm into the topic, let's take a look at those "statements":

* React components are mostly written in Javascript ES6 with JSX syntax.
* Browsers can understand some parts of ES6, but not all.
* Broswers have no idea about what JSX is and how to run that.

In that case, in order to run our React code in the browswer, you have to do some transformation work, to make the browser understand the code.

### [Babel](https://babeljs.io/)

> Babel is a compiler for writing next generation JavaScript.

Babel is a tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.

---

### [Webpack](https://webpack.js.org/)

> webpack is a static module bundler for modern JavaScript applications.

---

### Setup Webpack

Let't create a new project for webpack and react:

```
mkdir ~/Desktop/webpack-react
cd ~/Desktop/webpack-react
npm init -y
```

Install webpack:

```
npm install webpack webpack-cli --save-dev
```

Install React and React DOM:

```
npm install react react-dom --save-dev
```

Then create a new directory `src`, a file `index.js`, a file `Text.js` and a file `App.js` inside `src`, like what `create-react-app` did for us before.

```
mkdir src
cd src
touch App.js
touch Text.js
touch index.js
```

Wirte Text component:

```js
import React, {Component} from 'react';

class Text extends Component {
  render() {
    return <p>{this.props.text}</p>;
  }
}

export default Text;
```

Write App component:

```js
import React, {Component} from 'react';
import Text from './Text';

class App extends Component {
  render() {
    return <Text text="Hello World." />;
  }
}

export default App;
```

Write `index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

In order to use webpack and babel to do the transformation work, you need to write a webpack config file in your project, we usually use name `webpack.config.js` as the file name:

```js
const path = require('path');

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};

module.exports = config;
```

* An entry point indicates which module webpack should use to begin to compile.
* The output property tells webpack where to emit the bundles it creates and how to name these files.

Add a new npm script to run webpack:

```
...
"scripts": {
  "compile": "webpack"
}
...
```

When you run `npm run compile` now, you will get the error like this:

```
ERROR in ./src/index.js
Module parse failed: Unexpected token (5:16)
You may need an appropriate loader to handle this file type.
| import App from './App';
|
| ReactDOM.render(<App />, document.getElementById('root'));
|
```

---
