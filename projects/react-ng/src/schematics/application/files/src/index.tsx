import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './app/App';
import { HashRouter } from 'react-router-dom';
 
// set React to window object to be accessible globally in your app. Needed when you do not explicitely want to import React in every tsx/jsx file.
window.React = React;

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <App></App>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
