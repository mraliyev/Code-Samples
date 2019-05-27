import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import mainReducer from './store/reducers/mainReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
