# Todo List Example - Overview

In the next few sections we are going to build a todo list application using React and Redux step by step.

First of all, let's create a new project using `create-react-app` by running `create-react-app <your project name>`, then we need to install redux by `npm install redux --save`. After the installation, we are going to remove all the files inside `src` directory, in order to have a better code structure for Redux.

Let's take a look at the final result: [link](https://jrx5zpbbl.codesandbox.io/)

### Design State

```js
[
  {id: <Number>, text: <String>, completed: <Bool>},
  ...
]
```

---

### About Testing in `create-react-app`

To run test in `create-react-app` just run `npm test`. `create-react-app` will run test on files which end with `.test.js` in any place inside `src` directory.

```js
function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

describe('test for sum function', () => {
  it('should return 3 when pass 1 and 2', () => {
    expect(sum(1, 2)).toEqual(3);
  });
  it('should return 10 when pass 5 and 5', () => {
    expect(sum(5, 5)).toEqual(10);
  });
});

describe('test for multiply function', () => {
  it('should return 4 when pass 1 and 4', () => {
    expect(multiply(1, 4)).toEqual(4);
  });
  it('should return 10 when pass 2 and 5', () => {
    expect(multiply(2, 5)).toEqual(10);
  });
});
```
