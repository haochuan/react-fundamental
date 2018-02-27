# Lists And Keys

### How to render a list:

```js
const data = [
  {id: '37udje', name: 'a'},
  {id: 'etn4ws', name: 'b'},
  {id: '8uejr4', name: 'c'},
  {id: '03hds7', name: 'd'},
  {id: '340wje', name: 'e'},
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data};
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            Id: {this.state.data[0].id} | Name: {this.state.data[0].name}
          </li>
          <li>
            Id: {this.state.data[1].id} | Name: {this.state.data[1].name}
          </li>
          <li>
            Id: {this.state.data[2].id} | Name: {this.state.data[2].name}
          </li>
          <li>
            Id: {this.state.data[3].id} | Name: {this.state.data[3].name}
          </li>
          <li>
            Id: {this.state.data[4].id} | Name: {this.state.data[4].name}
          </li>
        </ul>
      </div>
    );
  }
}
```

---

### A better way: make reuseble component:

```js
const data = [
  {id: '37udje', name: 'a'},
  {id: 'etn4ws', name: 'b'},
  {id: '8uejr4', name: 'c'},
  {id: '03hds7', name: 'd'},
  {id: '340wje', name: 'e'},
];

function List(props) {
  return (
    <li>
      Id: {props.id} | Name: {props.name}
    </li>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data};
  }
  render() {
    return (
      <div>
        <ul>
          <List id={this.state.data[0].id} name={this.state.data[0].name} />
          <List id={this.state.data[1].id} name={this.state.data[1].name} />
          <List id={this.state.data[2].id} name={this.state.data[2].name} />
          <List id={this.state.data[3].id} name={this.state.data[3].name} />
          <List id={this.state.data[4].id} name={this.state.data[4].name} />
        </ul>
      </div>
    );
  }
}
```

---

### The best way to render a data list to components is to use `Array.map()` function to return a new array of React Elements from the data array.

Let's review how to use the `Array.map()` function first:

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);
```

How to use `Array.map()` in React to render multiple components:

```js
const data = [
  {id: '37udje', name: 'a'},
  {id: 'etn4ws', name: 'b'},
  {id: '8uejr4', name: 'c'},
  {id: '03hds7', name: 'd'},
  {id: '340wje', name: 'e'},
];

function List(props) {
  return (
    <li>
      Id: {props.id} | Name: {props.name}
    </li>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data};
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.data.map((record, index) => {
            return <List id={record.id} name={record.name} key={record.id} />;
          })}
        </ul>
      </div>
    );
  }
}
```

---

### Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

```js
{
  this.state.data.map((record, index) => {
    return <List id={record.id} name={record.name} key={record.name} />;
  });
}
```

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys:

```js
{
  this.state.data.map((record, index) => {
    return <List id={record.id} name={record.name} key={record.id} />;
  });
}
```

When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort:

```js
{
  this.state.data.map((record, index) => {
    return <List id={record.id} name={record.name} key={index} />;
  });
}
```

React does not recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state.
