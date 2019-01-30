import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTenant } from './actions'

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

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTenant,
}, dispatch)

export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(Tenant(WrapperComponent))
