import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { generateKey } from 'utilities'
import { NavLink } from 'react-router-dom'
import { transparentize } from 'polished'

const TheNavList = ({ list }) => {
  const renderList = () => list.map(({ name, to }) => (
    <NavList.Li key={generateKey(name)}>
      <NavLink to={to}>
        {name}
      </NavLink>
    </NavList.Li>
  ))

  return (
    <NavList>
      <NavList.Ul>
        {renderList()}
      </NavList.Ul>
    </NavList>
  )
}
const NavList = styled.nav`
  display: flex;
  margin-top: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xs};
`

NavList.Ul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

NavList.Li = styled.li`
  font-size: ${props => props.theme.size.base};
  color: ${props => props.theme.color.baseInverse};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  a {
    color: ${props => props.theme.color.baseInverse};
    text-decoration: none;
    padding: ${props => props.theme.spacing.xxs};
    border-radius: ${props => props.theme.value.borderRadius};
    opacity: 0.4;
    transition: background-color, opacity 300ms;
    &:hover {
      opacity: 1;
      background-color: ${props => transparentize(0.8, props.theme.color.bgDark)};
    }
    &.active {
      opacity: 1;
    }
  }
`

TheNavList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    to: PropTypes.string,
  })).isRequired,
}

export default TheNavList
