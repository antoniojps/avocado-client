import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  Icon,
  Title,
  Button,
} from 'elements'

const TheNavBar = ({ children }) => (
  <NavBar>
    <NavBar.Left>
      <NavBar.Icon>
        <Icon icon="logo" height={40} />
      </NavBar.Icon>
      <NavBar.Breadcrumb modifiers={['small', 'inverse']}>
        {children}
      </NavBar.Breadcrumb>
    </NavBar.Left>
    <NavBar.Right>
      <Button modifiers={['primary', 'noMargin', 'important']}>
        Login
      </Button>
    </NavBar.Right>
  </NavBar>
)

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${props => props.theme.spacing.xs};
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

TheNavBar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TheNavBar
