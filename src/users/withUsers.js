import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUsers,
  putUser,
  deleteUser,
} from './actions'

const mapStateToProps = ({
  users,
}) => ({
  ...users,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUsers,
  putUser,
  deleteUser,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
