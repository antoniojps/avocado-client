import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class BasePermission extends Component {
  state = {
    hasPermissions: false,
  }

  componentWillMount = () => {
    const { redirect, history } = this.props
    const hasPermissions = this.hasPermissions()
    if (!hasPermissions && redirect !== '') history.push(redirect)
  }

  hasPermissions = () => {
    const { required } = this.props
    if (!required) return false
    if (typeof required === 'string') return this.hasPermissionsString()
    if (required.length > 0) return this.hasPermissionsArray()
  }

  hasPermissionsArray = () => {
    const { permissions, required, needs } = this.props
    let hasPermissions = false
    // finds if user has any of the required permissions
    const userPermissionsUnfiltered = permissions.map(
      ({ name: permissionName }) => required.find(
        requiredPermission => requiredPermission === permissionName
      )
    )
    const userRequiredPermissions = userPermissionsUnfiltered.filter(perm => !!perm)
    if (needs === 'one') hasPermissions = userRequiredPermissions.length > 0
    if (needs === 'all') hasPermissions = userRequiredPermissions.length === required.length
    this.setState(() => ({ hasPermissions }))
    return hasPermissions
  }

  hasPermissionsString = () => {
    const { permissions, required } = this.props
    const hasPermissions = permissions.find(permission => permission.name === required)
    this.setState(() => ({ hasPermissions }))
    return hasPermissions
  }

  render() {
    const { hasPermissions } = this.state
    const { children } = this.props
    if (typeof children === 'function') {
      return children({
        hasPermissions,
      })
    }
    return (
      <>
        {hasPermissions && children}
      </>
    )
  }
}

const mapStateToProps = state => {
  const { user: { warmup } } = state
  const permissions = (warmup && warmup.permissions) || null
  return {
    permissions,
  }
}

BasePermission.propTypes = {
  required: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  permissions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  needs: PropTypes.oneOf([
    'one',
    'all',
  ]),
  redirect: PropTypes.string,
  history: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
}

BasePermission.defaultProps = {
  needs: 'all',
  redirect: '',
  children: null,
}

export default withRouter(connect(mapStateToProps)(BasePermission))
