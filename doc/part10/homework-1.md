# Homework 1

In this homework, you are going to design and build a basic express server, which has the endpoints to create, read, update and delete files. You will also need to write custom middlewares to handle different tasks.

---

#### Warmup

Write a function to parse a query string in the URL to an object with pairs of keys and values.
Suppose the request url is `http://localhost:3000/users?country=us&time=2018-01-01&gender=male`, write a function `parseQueryParams` which takes an url as the function parameter and return an object like:

```js
{
"country": "us",
"time": "2018-01-01",
"gender": "male"
}
```

---

#### Follow the suggetesd express application structure, create an express server application, with routes(endpoints) described as below:

* `GET /files`: list the file names in `public`. The response you get from this endpoint should be a json with a key named `files` which is an array of the file name in `public` directory:

```js
{
  files: ["file1", "file2", ...]
}
```

* `GET /files/:fileName`: Get a single file based on the `{fileName}`. If the file exsits, send the fileName as the string in the response, otherwise send `"The file does not exsited"`.

- `POST /files/:fileName`: create a new empty file in the `public` directory, the file name of the new file should be as same as the `fileName` query parameter in the route. Remember to send corresponding response after you create the file successfully or fail to create the file. For example: if the file has been created successfully, it good to let the client know and send a 200 status with a response json like:

```js
{
  message: 'a file has been created successfully.';
}
```

If somehow your server fails to create the new file, you should send a 500 status with the response json like:

```js
{
  error: 'Failed to create a new file.';
}
```

* `PUT /files/:oldFileName/:newFileName'`: rename an existed text file `{oldFileName}` to the new name `{newFileName}`. As same as the POST request above, please send the corresponding status code with a corresponding json response. **REMEMBER TO HANDLE THIS CASE: suppose you send a PUT request to /files/myFile/myNewFile, to rename `myFile` to `myNewFile`, what if `myFile`is not existed?**

- `DELETE /files/:fileName'`: delete an existed text file `{fileName}`. Please send the corresponding status code with corresponding json response. **REMEMBER TO HANDLE THIS CASE: suppose you send a DELETE request to /files/myFile, to delete `myFile`, what if `myFile`is not existed?**

> Hints
>
> * The best way to send a status code with response json is:

```js
res.status(200).json({...});
```

> * You can find the ways for node.js to list, create, change, delete files from the [official documentation](https://nodejs.org/api/fs.html);

---

#### Writing custom middleware

You are going to write your custom middleware to simulate the authentication process while accessing data. In the previous task, you have already got `GET /files/:fileName` to access to the `{fileName}` in `public` directory. From there, write an express custom middleware:

* Suppose you have already created `myFile1` and `privateFile` in `public` directory, now you can get the individual file name as the response from `GET /files/myFile1` and `GET /files/privateFile`.

* Design and implement a middleware to `GET /files/:fileName`, to prevent the access to files with file names which contain `private`. For example: `GET /files/myFile` will still showing the file name as the response, but `GET /files/privateFile` will give client a 401 status with a corresponsing json response. **NOTE that all the files with the file names which contain `private`(case sensitive) should be protected by the middleware, such as `myprivateFile`, `private`, `ThisIsprivate`, etc.**

* Now we are going to give the access to those `private` files if you have a valid token in the request. Suppose the token we are going to use is `12345`, then we you send a get request to `GET /files/privateFile?token=12345`, you can see the file name `privateFile` as the response instead of a 401. However, if there is no token provided in the URL, or the token is not `12345`, you will still received a 401.
