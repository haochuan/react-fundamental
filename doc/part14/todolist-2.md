# Todo List Example - Filter Reducer

We also need a place in the state to store current selected filter.

Let's create a new reducer file `filter.js` in `src/reducers/`.

### Knowing all actions

Think about what will happen to our filter state:

* Change the current filter

---

### Filter Reducer

```js
const filter = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};
export default filter;
```

---

### Writing Test

It is always a good practice to writing test in the whole development process. Since we just defined out recuder function for the todo list application. Let's write some tests for the recuder to make sure everything works as we expect.

Inside `src/reducers`, create a new file `filter.test.js` to write our test for `filter.js`.

```js
import filter from './filter';

describe('Test for filter reducer', () => {
  it('Should return "all" for default state', () => {
    expect(filter(undefined, {})).toEqual('all');
  });
  it('handle SET_FILTER action', () => {
    const action = {type: 'SET_FILTER', filter: 'active'};
    const result = 'active';
    expect(filter(undefined, action)).toEqual(result);
  });
});
```

Then let's run the test with `npm test` or `npm run test`.
