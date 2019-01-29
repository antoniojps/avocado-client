import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import GlobalStyle from 'GlobalStyle'
import withTenant from 'tenant/withTenant';
import { ThemeProvider } from 'styled-components'
import { theme } from 'utilities'
import Routes from './Routes'


const AppTenant = () => (
  <ThemeProvider theme={theme}>
    <>
      <Router>
        <Routes />
      </Router>
      <GlobalStyle />
    </>
  </ThemeProvider>
)

export default withTenant(AppTenant)
