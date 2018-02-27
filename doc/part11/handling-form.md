# Form Components Controlling

In HTML, form elements such as <input>, <textarea>, and <select> typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form.

An input form element whose value is controlled by React in this way is called a “controlled component”.

```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {textInput: '', textArea: '', select: ''};
  }

  handleInputChange = e => {
    this.setState({textInput: e.target.value});
    console.log('set textInput to: ', e.target.value);
  };
  handleTextAreaChange = e => {
    this.setState({textArea: e.target.value});
    console.log('set textArea to: ', e.target.value);
  };
  handleSelectChange = e => {
    this.setState({select: e.target.value});
    console.log('set select to: ', e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault(); // prevent Default HTML action
    console.log('The values in the form are: ', this.state);
  };

  render() {
    const formStyle = {
      margin: 'auto',
      padding: '50px',
    };
    const rowStyle = {
      margin: '10px',
      width: '300px',
      height: '100px',
      padding: '10px',
    };
    return (
      <form style={formStyle} onSubmit={this.handleSubmit}>
        <div style={rowStyle}>
          <label>
            Text Input
            <input
              type="text"
              value={this.state.textInput}
              onChange={this.handleInputChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Text Area
            <textarea
              value={this.state.textArea}
              onChange={this.handleTextAreaChange}
            />
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Select:
            <select
              value={this.state.select}
              onChange={this.handleSelectChange}>
              <option value="">Please select:</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>
        </div>
        <div style={rowStyle}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}
```
