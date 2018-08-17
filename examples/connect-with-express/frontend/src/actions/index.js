import axios from 'axios';
function requestStart() {
  return {
    type: 'USER_FETCH_START'
  };
}
function requestSuccess(response) {
  return {
    type: 'USER_FETCH_SUCCESS',
    data: response.data
  };
}
function requestFail(error) {
  return {
    type: 'USER_FETCH_FAIL',
    error
  };
}
function getData() {
  return (dispatch, store) => {
    dispatch(requestStart());
    axios
      .get('/api/users')
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}

export default getData;
