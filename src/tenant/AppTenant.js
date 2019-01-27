import React, { Component } from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import GlobalStyle from 'GlobalStyle'
import withTenant from 'tenant/withTenant';
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

export default withTenant(App)
