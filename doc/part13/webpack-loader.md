# Webpack and Loader

- A Webpack loader takes something as the input and produces something else as the output.
- Loaders enable webpack to process more than just JavaScript files (webpack itself only understands JavaScript).
- babel-loader is the Webpack loader responsible for taking in the ES6 code and making it understandable by the browser of choice.
- Obsviusly babel-loader makes use of Babel. And Babel must be configured to use a bunch of presets
  - babel-preset-env for compiling Javascript ES6 code down to ES5
  - babel-preset-react for compiling JSX and other stuff down to Javascript

Install dependencies:

```
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev
```

Add `babel-loader` in webpack config file.
At a high level, loaders have two properties in your webpack configuration:

- The test property identifies which file or files should be transformed.
- The use property indicates which loader should be used to do the transforming.

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
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
module.exports = config;
```

At last, we need to create a new file named `./babelrc` inside the project to tell Babel how to do transformation:

```js
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

At this point, we got a final version of our compiled Javascript file which can run inside any browser.
