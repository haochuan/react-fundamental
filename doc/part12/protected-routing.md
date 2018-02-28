# Protected Routes

Next we are going to talk about protected routes. If someone tries to access /admin, they’d be required to log in first. However, there are some things we need to cover before we can protect routes.

### Redirect

`<Redirect>` will replace the current location in the history stack with a new location. The new location is specified by the `to` prop. Here’s how we’ll be using `<Redirect>.`

```js
<Redirect to={{pathname: '/login', state: {from: props.location}}} />
```

So, if someone tries to access the /admin while logged out, they’ll be redirected to the /login route. The information about the current location is passed via state, so that if the authentication is successful, the user can be redirected back to the original location. Inside the child component, you can access this information at this.props.location.state.

```js
```
