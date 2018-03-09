import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/configureStore';
import UserDetail from './containers/UserDetail';
import UserList from './containers/UserList';

render(
  <Provider store={store}>
    <div>
      <UserDetail />
      <UserList />
    </div>
  </Provider>,
  document.getElementById('root')
);
