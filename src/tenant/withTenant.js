import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getTenant, putTenant, getRoles, putRole, postRole, deleteRole,
} from './actions'

const mapStateToProps = ({
  tenant,
}) => ({
  ...tenant,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTenant,
  putTenant,
  putRole,
  getRoles,
  postRole,
  deleteRole,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
