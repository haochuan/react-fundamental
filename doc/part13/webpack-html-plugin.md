# Webpack HTML Plugin

To display our React form we must tell Webpack to produce an HTML page. The resulting bundle will be placed inside a `<script></script>` tag.

Webpack needs on additional component for processing HTML: `html-webpack-plugin`.

Install the plugin first:

```
npm install html-webpack-plugin --save-dev
```

Next we need to create a HTML template `index.html` in `./src` for `html-webpack-plugin` to use:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

Then update the webpack configuration to use the plugin, use the `html-webpack-plugin` to add the compiled Javascript file to the HTML template, then move the final HTML to `./dist`:

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
      filename: './index.html',
    }),
  ],
};
module.exports = config;
```
