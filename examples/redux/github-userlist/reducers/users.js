const users = (state = { isLoading: false, error: '', data: [] }, action) => {
  switch (action.type) {
    case 'REQUEST_USERS_START':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_USERS_SUCCESS':
      console.log(action);
      return {
        ...state,
        isLoading: false,
        data: action.users
      };
    case 'REQUEST_USERS_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default users;
