import axios from 'axios';
const API_URL = 'https://api.github.com/users/';

function requestStart() {
  return {
    type: 'REQUEST_CURRENTUSER_START'
  };
}
function requestSuccess(currentUser) {
  return {
    type: 'REQUEST_CURRENTUSER_SUCCESS',
    currentUser
  };
}
function requestFail(error) {
  return {
    type: 'REQUEST_CURRENTUSER_FAIL',
    error
  };
}
export function getCurrentUser(username) {
  return (dispatch, getState) => {
    dispatch(requestStart());
    axios
      .get(API_URL + username)
      .then(response => {
        dispatch(requestSuccess(response.data));
      })
      .catch(err => {
        dispatch(requestFail(err.response.statusText));
      });
  };
}
