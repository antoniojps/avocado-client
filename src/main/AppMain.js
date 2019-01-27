import React, { Component } from 'react'
import GlobalStyle from 'GlobalStyle'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import { theme } from 'utilities'
import Routes from './Routes'
/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <Router>
            <Routes />
          </Router>
          <GlobalStyle />
        </>
      </ThemeProvider>
    )
  }
}

export default App
