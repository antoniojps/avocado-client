import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getResources,
  deleteResource,
  postResource,
  putResource,
} from './actions'

const mapStateToProps = ({
  resources,
}) => ({
  ...resources,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getResources,
  deleteResource,
  postResource,
  putResource,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
