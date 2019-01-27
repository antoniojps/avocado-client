import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getTenant } from './actions'

const withTenant = WrappedComponent => {
  const Tenant = props => <WrappedComponent {...props} />

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
