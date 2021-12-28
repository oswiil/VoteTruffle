import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createTheme } from '@material-ui/core';
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8f00', // This is an orange looking color
    },
    secondary: {
      main: '#ffcc80', //Another orange-ish color
    },
  },
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();