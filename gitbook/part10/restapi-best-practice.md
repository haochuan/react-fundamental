# RestAPI Best Practice

## API Design

We try to enforce development of sanely constructed RESTful interfaces, which team members and clients can consume simply and consistently. Lack of consistency and simplicity can massively increase integration and maintenance costs. We mostly follow resource-oriented design. Apart from readability and ease of use, it allows us to write generic libraries and connectors without even knowing what the API is about. It has three main factors: resources, collection, and URLs:

* A resource has data, gets nested, and there are methods that operate against it.
* A group of resources is called a collection.
* URL identifies the online location of resource or collection.

---

#### Use kebab-case for URLs.

Why? See [Google Web Master](https://support.google.com/webmasters/answer/76329)

---

#### Use camelCase for parameters in the query string or resource fields.

---

#### Always prefix API endpoints with `/api`, to differentiate it from your application routes.

---

#### Always use a plural nouns for naming a url pointing to a collection: `/api/users`, `/api/programs`, etc.

For more information, please see [this blog](https://apigee.com/about/blog/technology/restful-api-design-plural-nouns-and-concrete-names)

---

#### In the source code convert plurals to variables and properties with a List suffix.

```js
app.get('/api/users', (req, res) => {
  const userList = [1, 2, 3];
  res.status(200).json({data: userList});
});
```

---

#### Always use a singular concept that starts with a collection and ends to an identifier:

```js
/api/users/{id} -> /api/users/23
```

---

#### Try your best to avoid:

```
GET /blogs/:blogId/posts/:postId/summary
```

This is not pointing to a resource but to a property instead. You can pass the property as a parameter to trim your response.

---

#### Keep verbs out of your resource URLs.

Because if you use a verb for each resource operation you soon will have a huge list of URLs and no consistent pattern which makes it difficult for developers to learn. Plus we use verbs for something else.

---

#### Use verbs for non-resources. In this case, your API doesn't return any resources. Instead, you execute an operation and return the result. These are not CRUD \(create, retrieve, update, and delete\) operations:

```
/translate?text=Hello
```

Because for CRUD we use HTTP methods on resource or collection URLs. The verbs we were talking about are actually Controllers. You usually don't develop many of these. Read [this](https://byrondover.github.io/post/restful-api-guidelines/#controller) for more information.

---

#### The request body or response type is JSON then please follow camelCase for JSON property names to maintain the consistency.

---

#### Even though a resource is a singular concept that is similar to an object instance or database record, you should not use your `table_name` for a resource name and `column_name` resource property.

BE CAREFUL! Your intention is to expose Resources, not your database schema details.

---

#### Again, only use nouns in your URL when naming your resources and don’t try to explain their functionality.

Only use nouns in your resource URLs, avoid endpoints like `/addNewUser` or `/updateUser` . Also avoid sending resource operations as a parameter.

---

#### Explain the CRUD functionalities using HTTP methods:

* `GET`: To retrieve a representation of a resource.

* `POST`: To create new resources and sub-resources.

* `PUT`: To update existing resources.

* `PATCH`: To update existing resources. It only updates the fields that were supplied, leaving the others alone.

* `DELETE`: To delete existing resources.

---

#### For nested resources, use the relation between them in the URL. For instance, using id to relate an employee to a company.

`GET /api/schools/2/students`, should get the list of all students from school 2.

`GET /api/schools/2/students/31`, should get the details of student 31, which belongs to school 2.

`DELETE /api/schools/2/students/31`, should delete student 31, which belongs to school 2.

`PUT /api/schools/2/students/31`, should update info of student 31, Use PUT on resource-URL only, not collection.

`POST /api/schools`, should create a new school and return the details of the new school created. Use POST on collection-URLs.

---

#### Use a simple ordinal number for a version with a v prefix \(v1, v2\). Move it all the way to the left in the URL so that it has the highest scope:

```
http://api.domain.com/v1/schools/3/students
```

When your APIs are public for other third parties, upgrading the APIs with some breaking change would also lead to breaking the existing products or services using your APIs. Using versions in your URL can prevent that from happening.

---

#### Response messages must be self-descriptive.

Developers depend on well-designed errors at the critical times when they are troubleshooting and resolving issues after the applications they've built using your APIs are in the hands of their users.  
Take a look at the error message of one of the endpoint from Facebook:

```js
{
  "error": {
    "message": "Syntax error \"Field picture specified more than once. This is only possible before version 2.1\" at character 23: id,name,picture,picture",
    "type": "OAuthException",
    "code": 2500,
    "fbtrace_id": "xxxxxxxxxxx"
  }
}
```

---

#### Use only these 8 status codes to send with you response to describe whether everything worked, The client app did something wrong or The API did something wrong.

`200 OK` response represents success for `GET`, `PUT` or `POST` requests.

`201 Created` for when a new instance is created. Creating a new instance, using `POST` method returns `201` status code.

`304 Not Modified` response is to minimize information transfer when the recipient already has cached representations.

`400 Bad Request` for when the request was not processed, as the server could not understand what the client is asking for.

`401 Unauthorized` for when the request lacks valid credentials and it should re-request with the required credentials.

`403 Forbidden` means the server understood the request but refuses to authorize it.

`404 Not Found` indicates that the requested resource was not found.

`500 Internal Server Error` indicates that the request is valid, but the server could not fulfill it due to some unexpected condition.

---

#### Provide total numbers of resources in your response.

---

#### Accept `limit` and `offset` parameters.

---

#### Pagination, filtering, and sorting don’t need to be supported from start for all resources. Document those resources that offer filtering and sorting.
