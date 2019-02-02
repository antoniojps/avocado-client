import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import GlobalStyle from 'GlobalStyle'
import withAuth from 'user/withAuth'
import { ThemeProvider } from 'styled-components'
import { theme, history } from 'utilities'
import Routes from 'tenant/Routes'
import { flow } from 'lodash'
import { BasePageTheHeader as TheHeader } from 'ui'
import withTenant from './withTenant';

class AppTenant extends Component {
  componentWillMount() {
    const { updateGatherRedirect } = this.props
    updateGatherRedirect(window.location.pathname + window.location.search)
    history.push('/gather')
  }

  render() {
    // removed themes for now because two themes require more maintenance
    // const { tenant } = this.props
    // let themesId = null;
    // if (tenant) {
    //   themesId = tenant.themes_id;
    // }
    return (
      <ThemeProvider theme={theme}>
        <>
          <Router>
            <>
              <TheHeader />
              <Routes />
            </>
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


export default flow([withTenant, withAuth])(AppTenant)
