import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getUnits,
  deleteUnit,
  postUnit,
  putUnit,
} from './actions'


const mapStateToProps = ({
  units,
}) => ({
  ...units,
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUnits,
  deleteUnit,
  postUnit,
  putUnit,
}, dispatch)


export const Tenant = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />
  return hocComponent
}

export default WrapperComponent => connect(
  mapStateToProps,
  mapDispatchToProps
)(Tenant(WrapperComponent))
