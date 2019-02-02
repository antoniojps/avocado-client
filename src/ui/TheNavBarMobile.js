import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { callPropFunc } from 'utilities'
import { NavLink } from 'react-router-dom'

class TheNavBarMobile extends Component {
  onClose = () => {
    const { onClose } = this.props
    callPropFunc(onClose)
  }

  render() {
    const { className, isOpen } = this.props
    return (
      <div className={className}>
        <Nav isOpen={isOpen}>
          lol
        </Nav>
        <Background isOpen={isOpen} onClick={this.onClose} />
      </div>
    )
  }
}

const Nav = styled.div`
  z-index: ${props => props.theme.zIndex.xl};
  position: absolute;
  left: 0;
  top: 0;
  ${props => props.theme.gradient.bg()};
  width: 80%;
  height: 100%;
  padding-top: ${props => props.theme.spacing.xl};
`

Nav.Link = styled(NavLink)`

`

const Background = styled.div`
  z-index: ${props => props.theme.zIndex.ml};
  transition: background-color ${props => props.theme.value.transition};
  background-color: ${props => props.theme.color.bgDark};
  transition: opacity 2s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(30px);
  opacity: ${({ isOpen }) => (isOpen ? '0.5' : '0')};
`


export default styled(TheNavBarMobile)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndex.xxl};
  transition: all .4s;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0%)' : 'translateX(-100%)')};

`

TheNavBarMobile.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string.isRequired,
}

TheNavBarMobile.defaultProps = {
  isOpen: false,
}
