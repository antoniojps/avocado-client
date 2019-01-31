import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTenant, putTenant } from './actions'

const mapStateToProps = ({
  tenant: {
    tenant,
    tenantLoading,
    tenantFailure,
  },
}) => ({
  tenant,
  tenantLoading,
  tenantFailure,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTenant,
  putTenant,
}, dispatch)

const editTenant = tenant => editTenant(tenant);

export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
