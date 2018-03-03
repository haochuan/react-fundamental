### CSS Loader

It is quite common to have the ability to load CSS files into your React code using `import`. In order to achieve that, you need to use two additional webpack loaders: `style-loader` and `css-loader`.

### Install Loaders

```
npm install css-loader style-loader --save-dev
```

---

### Add additional rule in your webpack configuration

```js
module: {
  rules: [
    ...
    {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }
    ...
  ]
}
```

---

### Use CSS Loader

Now create a CSS file `style.css` in `./src`, write some styles inside the CSS file, then load the css file in any React Component by `import`;
