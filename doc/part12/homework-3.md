# Homeword Three

In this homework, we are going to make a simple online coding website.

* In `/`, you will show the `title` of the available problems, which you can get from `http://api.haochuan.io/oj/problems`.
* If you click one problem in `/`, you will be redirect to `/:problemId`, showing the detail information about this problem. You can get the detail of a problem by id `http://api.haochuan.io/oj/problems/:id`.
* Notice that sometimes the server will be down so when you send the http request to get the data, you may fail. If the request fails and you get nothing from the server, you need to show some texts or messages in the website to indicate user what happens.
