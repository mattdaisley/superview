import React from 'react';
import { Provider } from 'react-redux';

import ConfigureStore from './App/store/ConfigureStore';

import App from './App/App';

const Root = (props) => {
  const store = ConfigureStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;