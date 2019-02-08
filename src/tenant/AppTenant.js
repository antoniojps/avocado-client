import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import GlobalStyle from 'GlobalStyle'
import withAuth from 'user/withAuth'
import { ThemeProvider } from 'styled-components'
import { history } from 'utilities'
import Routes from 'tenant/Routes'
import { flow } from 'lodash'
import { BasePageTheHeader as TheHeader } from 'ui'
import { ToastContainer } from 'react-toastify';
import withTenant from './withTenant';
import { themeFromId } from './themes'

class AppTenant extends Component {
  componentWillMount() {
    const { updateGatherRedirect } = this.props
    updateGatherRedirect(window.location.pathname + window.location.search)
    history.push('/gather')
  }

  render() {
    const { tenant } = this.props
    let themesId = 0;
    if (tenant) {
      themesId = tenant.themes_id;
    }
    const theme = themeFromId(themesId)

    return (
      <ThemeProvider theme={theme}>
        <>
          <Router>
            <>
              <TheHeader />
              <Routes />
            </>
          </Router>
          <ToastContainer />
          <GlobalStyle />
        </>
      </ThemeProvider>
    )
  }
}

AppTenant.propTypes = {
  updateGatherRedirect: PropTypes.func.isRequired,
}


export default flow([withTenant, withAuth])(AppTenant)
