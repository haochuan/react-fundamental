# Homeword Four

This is a follow up for homework three.

* Create a Login component, and render this component at `/login`.
* Inside the Login component, you need to have an input box for username and an input box for password, as well as a button for login.
* You need to send a **POST** request to `http://api.haochuan.io/login` to verify the username and password. Only username `today` and password `YYYYMMDD` will pass the authentication. Note that the password will change based on the current date today. If today is June 18 2018, the password should be `20180618`.
* If the username and password do not match, indicate the user about what happened.
* Only logged in user can see `/` and `/:problemId`.
* Logged in user should not be able to see `/login` page again.
* You also need to use `localStorage` to store the information, so that once a logged in user refresh the page, the user will stay logged in.

More detail about `POST /login`:

* The post data or post body for this endpoint will be in this format:

```
{
  username: 'xxx',
  password: 'xxx'
}
```
