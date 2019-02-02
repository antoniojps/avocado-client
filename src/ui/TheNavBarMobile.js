import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { callPropFunc, generateMainNavList, getChildrenFromPath } from 'utilities'
import { NavLink } from 'react-router-dom'
import { routes } from 'tenant/Routes'
import { BaseBreakpoints } from 'ui'

class TheNavBarMobile extends Component {
  state = {
    pagesList: [],
  }

  onClose = () => {
    const { onClose } = this.props
    callPropFunc(onClose)
  }

  componentDidMount = () => {
    const mainPages = generateMainNavList(routes)
    const mainAndChildPages = mainPages.map((page) => {
      const child = getChildrenFromPath(page.to, routes)
      return {
        ...page,
        child,
      }
    })
    this.setState(() => ({ pagesList: mainAndChildPages }))
  }

  renderChildPagesList = (child) => {
    if (!child) return null;
    return child.map(page => (
      <Nav.LinkChild to={page.to} key={page.key} exact>
        {page.name}
      </Nav.LinkChild>
    ))
  }

  renderMainPagesList = () => {
    const { pagesList } = this.state
    return pagesList.map(page => (
      <div key={page.key}>
        <Nav.Link to={page.to} key={page.key} exact>
          {page.name}
        </Nav.Link>
        {this.renderChildPagesList(page.child)}
      </div>
    ))
  }

  render() {
    const { className, isOpen } = this.props
    return (
      <BaseBreakpoints render={({ md }) => (!md && (
        <div className={className}>
          <Nav isOpen={isOpen} onClick={this.onClose}>
            <Nav.LinkWrapper>
              {this.renderMainPagesList()}
            </Nav.LinkWrapper>
          </Nav>
          <Background isOpen={isOpen} onClick={this.onClose} />
        </div>
      ))}
      />
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

Nav.LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

Nav.Link = styled(NavLink)`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.ms};
  color: ${props => props.theme.color.baseInverse};
  font-size: ${props => props.theme.size.sm};
  font-weight: 600;
  width: 100%;
  &.active {
    color: ${props => props.theme.color.base};
    background-color: ${props => props.theme.color.bgLighter};
  }
`

Nav.LinkChild = styled(NavLink)`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.ms};
  padding-left: ${props => props.theme.spacing.l};
  color: ${props => props.theme.color.baseInverse};
  font-size: ${props => props.theme.size.s};
  font-weight: 600;
  width: 100%;
  &.active {
    color: ${props => props.theme.color.base};
    background-color: ${props => props.theme.color.bgLighter};
  }
`

const Background = styled.div`
  z-index: ${props => props.theme.zIndex.ml};
  transition: background-color ${props => props.theme.value.transition};
  background-color: ${props => props.theme.color.bgDark};
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
