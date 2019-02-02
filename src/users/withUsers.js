import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUsers,
} from './actions'

const mapStateToProps = ({
  users,
}) => ({
  ...users,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUsers,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
