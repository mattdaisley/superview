import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import { browserHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';

import { rootReducer } from './Reducers'

// import windowMiddleware from './Window/WindowMiddleware';

// const logger = createLogger();
// const router = routerMiddleware(browserHistory);

// const createStoreWithMiddleware = applyMiddleware(thunk, router)(createStore);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}

// export const ConfigureStore = () => {
//   const store = createStore(
//     rootReducer,
//     {},
//     applyMiddleware( )
//   );

//   return store;
// }


// export default ConfigureStore;