import React, { Component, cloneElement } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { applyStyleModifiers, styleModifierPropTypes } from 'styled-components-modifiers'
import { generateKey } from 'utilities'

class BaseTabs extends Component {
  // adds key and onClick router push function according to props
  generateTabElement = ({ element, pre }) => {
    const { history: { push } } = this.props
    const { props } = element
    const tabHasToProp = ('to' in props && props.to !== null)
    if (tabHasToProp) {
      return {
        ...element,
        key: generateKey(pre),
        props: {
          ...props,
          onClick: () => push(props.to),
        },
      }
    }
    return { ...element, key: generateKey(pre) }
  }

  // style modifiers according to tab position and active path
  generateModifiers = ({ index }) => {
    const { children, location: { pathname } } = this.props
    const tab = children[index]
    const tabHasToProp = ('to' in tab.props && tab.props.to !== null)
    const { to: tabToProp } = tab.props
    const isFirstTab = index === 0
    const isLastTab = index === children.length - 1
    let modifiers = []

    if (isFirstTab) modifiers = ['left']
    if (isLastTab) modifiers = ['right']
    if (tabHasToProp && tabToProp === pathname) {
      if (isFirstTab) modifiers = ['leftActive']
      else modifiers.push('active')
    }
    return { modifiers }
  }

  renderChildren = () => {
    const { children } = this.props
    return children.map((child, index) => cloneElement(
      this.generateTabElement({ element: child, pre: index }),
      this.generateModifiers({ index }),
    ))
  }

  render() {
    const { className } = this.props
    return (
      <div className={className}>
        {this.renderChildren()}
      </div>
    )
  }
}

BaseTabs.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

const TAB_MODIFIERS = {
  left: ({ theme }) => `
    border-top-left-radius: ${theme.value.borderRadius};
    border-bottom-left-radius: ${theme.value.borderRadius};
    border-left: ${theme.value.borderSize} solid ${theme.color.border} !important;
    &:hover {
      border-left: ${theme.value.borderSize} solid ${theme.color.primary} !important;
    }
  `,
  leftActive: ({ theme }) => `
    background-color: ${theme.color.primary};
    color: ${theme.color.baseInverse};
    ${theme.mixin.border({ color: theme.color.primary })};
    border-top-left-radius: ${theme.value.borderRadius};
    border-bottom-left-radius: ${theme.value.borderRadius};
    border-left: ${theme.value.borderSize} solid ${theme.color.primary} !important;
    &:hover {
      border-left: ${theme.value.borderSize} solid ${theme.color.primary};
    }
  `,
  right: ({ theme }) => `
    border-top-right-radius: ${theme.value.borderRadius};
    border-bottom-right-radius: ${theme.value.borderRadius};
    &:hover {
      border-right: ${theme.value.borderSize} solid ${theme.color.primary};
    }
  `,
  active: ({ theme }) => `
    background-color: ${theme.color.primary};
    color: ${theme.color.baseInverse};
    ${theme.mixin.border({ color: theme.color.primary })};
    border-left: 0;
  `,
}

BaseTabs.Tab = styled.button`
  padding: ${props => props.theme.spacing.xms} ${props => props.theme.spacing.m};
  color: ${props => props.theme.color.baseLighter};
  ${props => props.theme.mixin.border()}
  border-left: 0;
  background-color: ${props => props.theme.color.bgLighter};
  ${props => props.theme.mixin.transition()}
  &:hover {
    background-color: ${props => props.theme.color.primaryDarker};
    color: ${props => props.theme.color.baseInverse};
    cursor: pointer;
    ${props => props.theme.mixin.border({ color: props.theme.color.primary })};
    border-left: 0;
  }
  &:focus {
    ${props => props.theme.mixin.outline()};
  }
  ${applyStyleModifiers(TAB_MODIFIERS)};
`

BaseTabs.Tab.propTypes = {
  to: PropTypes.string.isRequired,
  modifiers: styleModifierPropTypes(TAB_MODIFIERS),
}

BaseTabs.Tab.defaultProps = {
  to: null,
}

export default withRouter(styled(BaseTabs)`
  display: flex;
  margin-bottom: ${props => props.theme.spacing.m};
`)
