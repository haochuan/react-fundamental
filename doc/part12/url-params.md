# URL Parameters

Before we go further into React Router, we need to have a basic understanding of URL parameters.

### URL Structure

http://www.example.com:3000/users/foo?key1=40&key2=bar

* http - protocol
* www.example.com - domain name
* :80 - port number
* /users/foo - route
* ?key1=40&key2=bar - query (search) parameters

---

### Path Parameter

In React router, we define a route like this:

```js
<Route path="/users" component={User} />
```

We can define a route like this:

```js
<Route path="/:pathParameter" component={User} />
```

If you go `/user`, in `User` component you can get its path parameter:

```js
{
  pathParameter: 'user';
}
```

If you define a route like this:

```js
<Route path="/:p1/:p2/:p3" component={User} />
```

If you go `/user/foo/bar`, in `User` component you can get its path parameter:

```js
{
  p1: 'user',
  p2: 'foo',
  p3: 'bar'
}
```

---

### Query Parameter

http://www.example.com:3000/users/foo?key1=40&key2=bar

The query parameters for the URL will be:

```js
{key1: '40',
key2: 'bar'}
```

* `?` indicates the start point of query parameters
* `&` separate different query parameters
