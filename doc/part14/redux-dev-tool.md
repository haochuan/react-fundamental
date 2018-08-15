# [Redux Dev Tool](https://github.com/zalmoxisus/redux-devtools-extension#usage)

## Installation

### 1. For Chrome

* from [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd);
* or build it with `npm i && npm run build:extension` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./build/extension`;
* or run it in dev mode with `npm i && npm start` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./dev`.

### 2. For Firefox

* from [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/remotedev/);
* or build it with `npm i && npm run build:firefox` and [load the extension's folder](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) `./build/firefox` (just select a file from inside the dir).

### 3. For Electron

* just specify `REDUX_DEVTOOLS` in [`electron-devtools-installer`](https://github.com/GPMDP/electron-devtools-installer).

### 4. For other browsers and non-browser environment

* use [`remote-redux-devtools`](https://github.com/zalmoxisus/remote-redux-devtools).

---

## Setup

### 1. Basic Setup

For a basic [Redux store](http://redux.js.org/docs/api/createStore.html) simply add:

```diff
 const store = createStore(
   reducer,
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
```

Note that [`preloadedState`](http://redux.js.org/docs/api/createStore.html) argument is optional in Redux' [`createStore`](http://redux.js.org/docs/api/createStore.html).

### 1.2 Advanced store setup

If you setup your store with [middleware and enhancers](http://redux.js.org/docs/api/applyMiddleware.html), change:

```diff
  import { createStore, applyMiddleware, compose } from 'redux';

+ const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
+ const store = createStore(reducer, composeEnhancers(
- const store = createStore(reducer, compose(
    applyMiddleware(...middleware)
  ));
```
