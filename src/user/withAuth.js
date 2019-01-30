import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateGatherRedirect } from './actions'

export const mapStateToProps = ({
  user: {
    gatherRedirect,
  },
}) => ({
  gatherRedirect,
})

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateGatherRedirect,
}, dispatch)

export const withAuth = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(mapStateToProps, mapDispatchToProps)(withAuth(WrapperComponent))
