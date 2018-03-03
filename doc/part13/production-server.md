# Running Production

Now we have covered the general idea of the entire development process of React without one thing: how to deploy our React application to production?

From previous content we know, after the compilation via webpack and babel, our React application is just a single HTML file and a single Javascript file, which has been already included in the HTML file. What we need to do is just to have a server to serve the HTML page.

### Setup Express Server

Express is the most popular framework to write server in Javascript, and over 90% of production node.js servers are using or based on Express.

* Create another webpack config file `webpack.config.prod.js` for production.

```js
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'production',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: path.join(__dirname, 'dist', 'index.html'),
    }),
  ],
};
module.exports = config;
```

* Add a new npm script to run webpack using the `production` config file

```
"scripts": {
  "start": "webpack-dev-server --open",
  "compile": "webpack",
  "build": "webpack --config webpack-prod.config.js"
}
```

* Install express dependency first in our project.

```
npm install express --save
```

* Create a file `server.js` in the root of our project, then write a basic express server.

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

* Set the route: no matter what route the user tries to visit, always send the HTML file back as the response.

```
const express = require('express');
const path = require('path');
const app = express();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

* Set `dist` as a static folder in order to let HTML get the compiled Javascript file.

```js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

* Add a new npm script to run production server

```js
"scripts": {
  "start": "webpack-dev-server --open",
  "compile": "webpack",
  "build": "webpack --config webpack-prod.config.js",
  "production": "node server.js"
}
```
