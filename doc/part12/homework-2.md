# Homework Two

This homework is a followup version of [Homework Four](../part11/homework-4.md) in last React section. In this homework, first of all we need to add the authentication layer to the React application, and then rewrite some of the part using React Router.

* Write another route and component for route `/`, simply showing some text like `Home Page`.
* Write another route and component for route `/login`. In `/login` page, you need to have a place for user to type username and password (input field). There also should be a button for user to click and login. Once user clicks the button, you should check if the username matches the string `"username"` and if the password matches the string `"password"`. If they both matched then the user should be considered as `authenticated`. An authenticated user will be redirected to `/` if the user tries go to `/login`.
* User will be redirected to `/login` if they go any other page before authentication.
* Any user should be able to see link to `/`, `/login`, `/list` all the time, which mean no matter if the user pass the authentication or not, the user should always see those links.
* Using React Router to rewrite the previous application, so that in order to see the page showing in previous homework, you hava to go `/list` instead of root `/`.
* Now we need to rethink about the github user list. We need to remove the container for detail information first in the page at `/list`, then write a new route and component(s) for `/list/:userId`. Suppose that the id of one of the users in the list is `mike`, so if you click that user in the list, you will see the details about that user in `/list/mike`, instead in the same page at `/list`.
