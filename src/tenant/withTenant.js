import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTenant, putTenant, getRoles } from './actions'

const mapStateToProps = ({
  tenant,
}) => ({
  ...tenant,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTenant,
  putTenant,
  getRoles,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
