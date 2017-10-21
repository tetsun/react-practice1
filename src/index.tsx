import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import Counter1 from './containers/Counter1';
import Counter2 from './containers/Counter2';
import { Provider } from 'react-redux';
import './index.css';

const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    logger,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Counter1 />
      <Counter2 />
    </div>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
