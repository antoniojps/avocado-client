import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { callPropFunc } from 'utilities'

class TheNavIcon extends Component {
  handleClick = () => {
    const { onClick: onClickParent } = this.props
    callPropFunc(onClickParent)
  }

  render() {
    const { isOpen } = this.props
    return (
      <Icon onClick={this.handleClick}>
        <Icon.LineTop isOpen={isOpen} />
        <Icon.LineBottom isOpen={isOpen} />
      </Icon>
    )
  }
}

TheNavIcon.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

TheNavIcon.defaultProps = {
  isOpen: false,
  onClick: null,
}

const Icon = styled.div`
  cursor: pointer;
  height: 40px;
  width: 48px;
  padding: ${props => props.theme.spacing.xxs} ${props => props.theme.spacing.s};
  padding-left: ${props => props.theme.spacing.base};
  padding-top: ${props => props.theme.spacing.base};
  z-index: ${props => props.theme.zIndex.above};
  position: relative;
`

const Line = styled.div`
  position: absolute;
  width: 24px;
  height: 3px;
  border-radius: 3px;
  background-color: ${props => props.theme.color.bgLighter};
`

Icon.LineTop = styled(Line)`
  transform-origin: left center;
  transition: transform 200ms;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0deg)')};
`

Icon.LineBottom = styled(Line)`
  transform-origin: right center;
  transition: transform 200ms;
  transform: ${({ isOpen }) => (isOpen ? 'translate(-8px, 0) rotate(-45deg)' : 'translate(0px, 12px) rotate(0deg)')};

`

export default TheNavIcon
