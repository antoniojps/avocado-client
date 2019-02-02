import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUnits,
} from './actions'

const mapStateToProps = ({
  units,
}) => ({
  ...units,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUnits,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
