import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateGatherRedirect, login, fetchWarmup, register } from './actions'

export const mapStateToProps = ({
  user: {
    gatherRedirect,
    user,
    userLoading,
    userFailure,
    userAuthenticated,
    userRegisterLoading,
    userRegisterFailure,
    warmup,
    warmupLoading,
    warmupFailure,
  },
}) => ({
  gatherRedirect,
  user,
  userLoading,
  userFailure,
  userAuthenticated,
  userRegisterLoading,
  userRegisterFailure,
  warmup,
  warmupLoading,
  warmupFailure,
})

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateGatherRedirect,
  login,
  fetchWarmup,
  register,
}, dispatch)

export const withAuth = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(withAuth(WrapperComponent))
