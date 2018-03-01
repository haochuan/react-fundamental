# Webpack Dev Server

Up to now, we have covered how to make React Component really work in browsers. The only issue is that there is no server to serve the final compiled HTML file. So every time you make a single change in your code, you have to `npm run compile` to get the compiled version of JS and HTML files, then open the HTML file in your browser. For production use it could be fine, but it is inconvenient for development use.

We need find a way to watch the change in you code, compile the JS files when you maka any change, and then serve the latest HTML to the browser.

It takes only 3 lines of configuration to have a development server up and running.

To set up Webpack Dev Server install the package with:

```
npm install webpack-dev-server --save-dev
```

Configure the server by adding the following lines inside `webpack.config.js`:

```js
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: path.join(__dirname, 'dist', 'index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
  },
};
module.exports = config;
```

At last add a new npm script in `package.json`:

```
...
"scripts": {
  "start": "webpack-dev-server --open",
  "compile": "webpack"
}
...
```
