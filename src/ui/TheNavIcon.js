import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring'
import { callPropFunc } from 'utilities'

class TheNavIcon extends Component {
  state = {
    hasClicked: false,
  }

  handleClick = () => {
    const { onClick: onClickParent } = this.props
    this.setState({ hasClicked: true })
    callPropFunc(onClickParent)
  }

  renderCloseIcon = () => {
    const { hasClicked } = this.state

    // animate
    if (hasClicked) {
      return (
        <Spring
          from={{
            rotationA: 0, rotationB: 0, yA: 0, yB: 10,
          }}
          to={{
            rotationA: 45, rotationB: -45, yA: 9, yB: 9,
          }}
        >
          {props => (
            <svg width="24" height="24" viewBox="0 0 24 13" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(-1 -1)" fill="#FFF" fillRule="evenodd">
                <rect transform={`rotate(${props.rotationA} 10 10.5)`} x="-2" y={props.yA} width="24" height="3" rx="1.5" />
                <rect transform={`rotate(${props.rotationB} 10 10.5)`} x="-2" y={props.yB} width="24" height="3" rx="1.5" />
              </g>
            </svg>
          )}
        </Spring>
      )
    }

    return (
      <svg width="24" height="24" viewBox="0 0 24 13" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-1 -1)" fill="#FFF" fillRule="evenodd">
          <rect transform="rotate(45 10 10.5)" x="-2" y="9" width="24" height="3" rx="1.5" />
          <rect transform="rotate(-45 10 10.5)" x="-2" y="9" width="24" height="3" rx="1.5" />
        </g>
      </svg>
    )
  }

  renderNavIcon = () => {
    const { hasClicked } = this.state

    // animate
    if (hasClicked) {
      return (
        <Spring
          from={{
            rotationA: 45, rotationB: -45, yA: 9, yB: 9,
          }}
          to={{
            rotationA: 0, rotationB: 0, yA: 0, yB: 10,
          }}
        >
          {props => (
            <svg width="24" height="24" viewBox="0 0 24 13" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(-1 -1)" fill="#FFF" fillRule="evenodd">
                <rect transform={`rotate(${props.rotationA} 10 10.5)`} x="-2" y={props.yA} width="24" height="3" rx="1.5" />
                <rect transform={`rotate(${props.rotationB} 10 10.5)`} x="-2" y={props.yB} width="24" height="3" rx="1.5" />
              </g>
            </svg>
          )}
        </Spring>
      )
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 13" xmlns="http://www.w3.org/2000/svg">
        <g fill="#FFF" fillRule="evenodd">
          <rect transform="rotate(0 10 10.5)" x="-2" y="0" width="24" height="3" rx="1.5" />
          <rect transform="rotate(0 10 10.5)" x="-2" y="10" width="24" height="3" rx="1.5" />
        </g>
      </svg>
    )
  }

  render() {
    const { isOpen } = this.props
    return (
      <NavIconWrapper onClick={this.handleClick}>
        {isOpen
          ? this.renderCloseIcon()
          : this.renderNavIcon()
        }
      </NavIconWrapper>
    )
  }
}

TheNavIcon.propTypes = {
  isOpen: PropTypes.bool,
}

TheNavIcon.defaultProps = {
  isOpen: false,
}

const NavIconWrapper = styled.div`
  cursor: pointer;
  padding: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.s};
  padding-left: ${props => props.theme.spacing.base};
  padding-top: ${props => props.theme.spacing.base};
  z-index: ${props => props.theme.zIndex.aboveTooltips + 1};
  position: relative;
`

export default TheNavIcon
