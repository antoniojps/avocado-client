import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Icon,
  Title,
} from 'elements'
import { BaseBreakpoints, TheNavList } from 'ui'
import { routes } from 'tenant/Routes'
import { generateMainNavList } from 'utilities'
import TheNavIcon from './TheNavIcon'
import TheNavBarMobile from './TheNavBarMobile'

class TheNavBar extends Component {
  state = {
    isNavOpen: false,
  }

  openNavMobile = () => {
    this.setState(({ isNavOpen }) => ({ isNavOpen: !isNavOpen }))
  }

  handleMobileClose = () => {
    this.setState(() => ({ isNavOpen: false }))
  }

  getNavList = () => generateMainNavList(routes)

  render() {
    const list = this.getNavList()
    const { children } = this.props
    const { isNavOpen } = this.state
    return (
      <>
        <NavBar>
          <NavBar.Left>
            <NavBar.Icon>
              <BaseBreakpoints render={({ md }) => (md ? (
                <Icon icon="logo" height={40} />
              ) : (
                <TheNavIcon onClick={this.openNavMobile} isOpen={isNavOpen} />
              ))}
              />
            </NavBar.Icon>
            <TheNavBarMobile isOpen={isNavOpen} onClose={this.handleMobileClose} />
            <BaseBreakpoints render={({ md }) => md && (
              <NavBar.Breadcrumb modifiers={['small', 'inverse']}>
                {children}
              </NavBar.Breadcrumb>
            )}
            />
          </NavBar.Left>
          <NavBar.Right>
            User
          </NavBar.Right>
        </NavBar>
        <BaseBreakpoints render={({ md }) => (md
          ? (
            <>
              <Seperator />
              <TheNavList list={list} />
            </>
          )
          : (
            <NavBar.Bottom>
              <NavBar.Breadcrumb modifiers={['small', 'inverse']}>
                {children}
              </NavBar.Breadcrumb>
            </NavBar.Bottom>
          ))}
        />
      </>
    )
  }
}


const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
`
const Seperator = styled.div`
  height: 2px;
  width: 100%;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.32) 15%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.36) 85%, rgba(255,255,255,0.00) 100%);
  margin-top: ${props => props.theme.spacing.s};
`

NavBar.Left = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

NavBar.Icon = styled.div`
  padding-right: ${props => props.theme.spacing.base};
`

NavBar.Breadcrumb = styled(Title)`
  padding: 0;
`

NavBar.Right = styled.div`
  display: flex;
  align-items: center;
  color: white;
`

NavBar.Bottom = styled.div`
  padding: ${props => props.theme.spacing.base};
  padding-top: ${props => props.theme.spacing.xs};
`

TheNavBar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TheNavBar
