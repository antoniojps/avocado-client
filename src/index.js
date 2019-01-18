import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from 'utilities'
import App from './App';
import * as serviceWorker from './serviceWorker'

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <>
      <App />
      <GlobalStyle />
    </>
  </ThemeProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
