import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateGatherRedirect, login } from './actions'

export const mapStateToProps = ({
  user: {
    gatherRedirect,
    user,
    userLoading,
    userFailure,
    userAuthenticated,
  },
}) => ({
  gatherRedirect,
  user,
  userLoading,
  userFailure,
  userAuthenticated,
})

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateGatherRedirect,
  login,
}, dispatch)

export const withAuth = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(withAuth(WrapperComponent))
