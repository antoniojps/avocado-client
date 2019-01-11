import React, { Component } from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'utilities'
import { Layout } from 'elements'
import BaseTabs from 'ui/BaseTabs'
import Routes from './Routes'

const Tabs = () => (
  <BaseTabs>
    <BaseTabs.Tab to="/">
    Type
    </BaseTabs.Tab>
    <BaseTabs.Tab to="/elements">
    Elements
    </BaseTabs.Tab>
    <BaseTabs.Tab to="/components">
    Components
    </BaseTabs.Tab>
  </BaseTabs>
)

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Layout>
            <Tabs />
            <Routes />
          </Layout>
        </ThemeProvider>
      </Router>
    )
  }
}

export default App
