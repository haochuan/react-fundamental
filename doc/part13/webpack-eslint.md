# ESLint

Linter is a program that checks our code for any error or warning that can cause bugs. JavaScript’s linter, ESLint, is a very flexible linting program that can be configured in many ways.

Install dependencies:

```
npm --save-dev install eslint eslint-loader babel-eslint eslint-config-react eslint-plugin-react
```

We need to add `eslint` in webpack config:

```js
const path = require('path');

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  }
};
module.exports = config;
```

We need to create an eslint config file, create `.eslintrc`:

```js
{
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}

```

Now when you run `npm compile`, you are adding the ESlint in the pipeline.
