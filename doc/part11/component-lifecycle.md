# Component Life Cycle

Each React component has several “lifecycle methods” that you can override to run code at particular times in the process. Methods prefixed with will are called right before something happens, and methods prefixed with did are called right after something happens.

Through lifecycle methods, we can then control what happens when each tiny section of your UI renders, updates, thinks about re-rendering, and then disappears entirely.

**Only class component has life cycle methods.**

---

### Component Life Cycle

* constructor

  The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.

* render()

* componentDidMount()

  componentDidMount() is invoked immediately after a component is mounted.

* shouldComponentUpdate(nextProps, nextState)

  shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true. Use shouldComponentUpdate() to let React know if a component’s output is not affected by the current change in state or props.

* render()

* componentDidUpdate(prevProps, prevState)

  componentDidUpdate() is invoked immediately after updating occurs.

* componentWillUnmonut()

  componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.

For all component life cycle method, please see https://reactjs.org/docs/react-component.html

```js
class App extends Component {
  constructor(props) {
    console.log('constructor called.');
    super(props);
    this.state = {number: 1};
  }

  componentDidMount() {
    console.log('componentDidMount() called.');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate() called.');
    console.log('current props: ', this.props);
    console.log('next props: ', nextProps);
    console.log('current state: ', this.state);
    console.log('next state: ', nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate() called.');
    console.log('current props: ', this.props);
    console.log('previous props: ', prevProps);
    console.log('current state: ', this.state);
    console.log('previous state: ', prevState);
  }
  componentWillUnmonut() {
    console.log('componentWillUnmonut() called.');
  }
  addOne = () => {
    this.setState({number: this.state.number + 1});
  };
  render() {
    console.log('render() called.');
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.addOne}>Add One</button>
      </div>
    );
  }
}
```

---
