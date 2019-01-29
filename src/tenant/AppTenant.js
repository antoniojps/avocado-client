import React, { Component } from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import GlobalStyle from 'GlobalStyle'
import withTenant from 'tenant/withTenant';
import { ThemeProvider } from 'styled-components'
import { theme } from 'utilities'
import PropTypes from 'prop-types'
import Routes from './Routes'

class App extends Component {
  componentDidMount() {
    const { getTenant } = this.props;
    getTenant();
  }

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
App.propTypes = {
  getTenant: PropTypes.func.isRequired,
}

export default withTenant(App)
