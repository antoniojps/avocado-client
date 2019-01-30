import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import GlobalStyle from 'GlobalStyle'
import withAuth from 'user/withAuth'
import { ThemeProvider } from 'styled-components'
import { theme, history } from 'utilities'
import Routes from './Routes'

class AppTenant extends Component {
  componentWillMount() {
    const { updateGatherRedirect } = this.props
    updateGatherRedirect(window.location.pathname + window.location.search)
    history.push('/gather')
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

AppTenant.propTypes = {
  updateGatherRedirect: PropTypes.func.isRequired,
}


export default withAuth(AppTenant)
