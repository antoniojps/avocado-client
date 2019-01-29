import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BaseLoader } from 'ui'
import { CenterDiv } from 'elements'
import { ThemeProvider } from 'styled-components'
import { theme } from 'utilities'
import { getTenant } from './actions'

const withTenant = WrappedComponent => {
  class Tenant extends Component {
    componentDidMount() {
      const { tenant, getTenant } = this.props;
      if (!tenant) {
        getTenant();
      }
    }

    render() {
      const { tenantLoading } = this.props;
      return tenantLoading
        ? <ThemeProvider theme={theme}><CenterDiv><BaseLoader message="Loading something..." /></CenterDiv></ThemeProvider>
        : <WrappedComponent {...this.props} />;
    }
  }
  const mapStateToProps = ({
    tenant: {
      tenant,
      tenantLoading,
      tenantError,
    },
  }) => ({
    tenant,
    tenantLoading,
    tenantError,
  })
  const mapDispatchToProps = (dispatch) => bindActionCreators({
    getTenant,
  }, dispatch)

  Tenant.propTypes = {
    tenant: PropTypes.shape({}),
    tenantLoading: PropTypes.bool.isRequired,
    tenantError: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({}),
    ]),
    getTenant: PropTypes.func.isRequired,
  }
  Tenant.defaultProps = {
    tenant: null,
    tenantError: null,
  }

  return connect(mapStateToProps, mapDispatchToProps)(Tenant)
}
export default withTenant
