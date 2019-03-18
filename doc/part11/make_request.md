# Making HTTP Request

Most of the time we need some data to render a web UI. One of the most asked question new React developers have is: How do I do HTTP request to get data in React?

First of all, React itself does not have any way to fetch data since it is just a view library to build web UI. In that case you need to use external libraries to do that.

### [axios](https://github.com/axios/axios)

axios is a promise based HTTP client for the browser and node.js, and it is also one of the most popular and most common used library to send HTTP request in React.

---

### Install axios

```
npm install axios --save
```

---

### How to use axios

```js
// options is a JS object
axios(options)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
```

---

### Examples

- Send a GET request

```js
axios({ method: 'get', url: '/users' })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// or

axios
  .get('/users')
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
```

- Send a POST request

```js
axios({
  method: 'post',
  url: '/users',
  data: { name: 'name', password: 'password' }
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// or

axios
  .post('/users', { name: 'name', password: 'password' })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
```

- Send a PUT request

```js
axios({
  method: 'put',
  url: '/users',
  data: { name: 'name', password: 'password' }
})
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// or

axios
  .put('/users', { name: 'name', password: 'password' })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
```

- Send a DELETE request

```js
axios({ method: 'delete', url: '/users' })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });

// or

axios
  .delete('/users', { name: 'name', password: 'password' })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
```

---

### Best place to get data in React

In this example, we are going to get some user data from github and render the data on the UI: https://api.github.com/users

```js
function List(props) {
  const imageStyle = { width: 100, height: 100 };
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.login}</td>
      <td>
        <img style={imageStyle} src={props.avatar_url} alt={props.avatar_url} />
      </td>
    </tr>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    // remember that you have to initialize
    // the same data type for the result you want to get in state
    this.state = { data: [] };
  }
  componentDidMount() {
    // componentDidMount is the right place to get some data to render the page
    axios({ method: 'get', url: 'https://api.github.com/users' })
      .then(response => {
        console.log(response);
        this.setState({ data: response.data });
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            return <List key={item.id} {...item} />;
          })}
        </tbody>
      </table>
    );
  }
}
```

### Common pattern to handle data fetching in React

```js
function List(props) {
  const imageStyle = { width: 100, height: 100 };
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.login}</td>
      <td>
        <img style={imageStyle} src={props.avatar_url} alt={props.avatar_url} />
      </td>
    </tr>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    // remember that you have to initialize
    // the same data type for the result you want to get in state
    this.state = { data: [], isLoading: false };
  }
  componentDidMount() {
    // componentDidMount is the right place to get some data to render the page
    this.setState({ isLoading: true });
    axios({ method: 'get', url: 'https://api.github.com/users' })
      .then(response => {
        setTimeout(() => {
          this.setState({ data: response.data, isLoading: false });
        }, 3000);
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    const userTable = (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            return <List key={item.id} {...item} />;
          })}
        </tbody>
      </table>
    );

    const loadingUI = <div>Loading...</div>;
    return <div>{!this.state.isLoading ? userTable : loadingUI}</div>;
  }
}
```
