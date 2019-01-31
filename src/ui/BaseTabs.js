import React, { Component, cloneElement } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { applyStyleModifiers, styleModifierPropTypes } from 'styled-components-modifiers'
import { generateKey, above } from 'utilities'

class BaseTabs extends Component {
  // adds key and onClick router push function according to props
  generateTabElement = ({ element, pre }) => {
    const { history: { push }, orientation } = this.props
    const { props } = element
    const tabHasToProp = ('to' in props && props.to !== null)
    if (tabHasToProp) {
      return {
        ...element,
        key: generateKey(pre),
        props: {
          ...props,
          orientation,
          onClick: () => push(props.to),
        },
      }
    }
    return {
      ...element,
      key: generateKey(pre),
      props: {
        ...props,
        orientation,
      },
    }
  }

  // style modifiers according to tab position and active path
  generateModifiers = ({ index }) => {
    const { children, location: { pathname }, orientation } = this.props
    const tab = children[index]
    const tabHasToProp = ('to' in tab.props && tab.props.to !== null)
    const { to: tabToProp } = tab.props
    const isHorizontal = orientation === 'horizontal'
    const isFirstTab = index === 0
    const isLastTab = index === children.length - 1
    const isActive = (tabHasToProp && tabToProp === pathname)
    let modifiers = []

    if (isFirstTab) modifiers = isHorizontal ? ['left'] : ['top']
    if (isLastTab) modifiers = isHorizontal ? ['right'] : ['bottom']
    if (isActive) {
      if (isFirstTab && isHorizontal) modifiers = ['leftActive']
      if (isLastTab && !isHorizontal) modifiers = ['bottomActive']
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
  orientation: PropTypes.string,
}

BaseTabs.defaultProps = {
  orientation: 'horizontal',
}

const TAB_MODIFIERS = {
  top: ({ theme, orientation }) => `
  border-top-left-radius: ${theme.value.borderRadius};
  border-top-right-radius: ${theme.value.borderRadius};
  ${theme.mixin.border({ orientation })};

  &:hover {
    background-color: ${theme.color.primaryDarker};
    ${theme.mixin.border({ color: theme.color.primaryDarker, orientation })};
  }
  `,
  bottom: ({ theme }) => `
  border-bottom-left-radius: ${theme.value.borderRadius};
  border-bottom-right-radius: ${theme.value.borderRadius};
  ${theme.mixin.border()};
  &:hover {
    background-color: ${theme.color.primaryDarker};
    ${theme.mixin.border({ color: theme.color.primaryDarker })};
  }
  `,
  bottomActive: ({ theme }) => `
  color: ${theme.color.baseInverse};
  background-color: ${theme.color.primary};
  border-bottom-left-radius: ${theme.value.borderRadius};
  border-bottom-right-radius: ${theme.value.borderRadius};
  ${theme.mixin.border({ color: theme.color.primary })};
  &:hover {
    background-color: ${theme.color.primaryDarker};
    ${theme.mixin.border({ color: theme.color.primaryDarker })};
  }
  `,
  left: ({ theme, orientation }) => `
    border-top-left-radius: ${theme.value.borderRadius};
    border-bottom-left-radius: ${theme.value.borderRadius};
    ${theme.mixin.border({ orientation })}
    border-left: 2px solid ${theme.color.borderBtn};
    &:hover {
      background-color: ${theme.color.primaryDarker};
      ${theme.mixin.border({ color: theme.color.primaryDarker, orientation })};
      border-left: 2px solid ${theme.color.primaryDarker};
    }
  `,
  leftActive: ({ theme, orientation }) => `
    background-color: ${theme.color.primary};
    color: ${theme.color.baseInverse};
    ${theme.mixin.border({ color: theme.color.primary, orientation })};
    border-left: 2px solid ${theme.color.primary} !important;
    border-top-left-radius: ${theme.value.borderRadius};
    border-bottom-left-radius: ${theme.value.borderRadius};
    &:hover {
      ${theme.mixin.border({ color: theme.color.primaryDarker, orientation })};
      border-left: 2px solid ${theme.color.primaryDarker} !important;
    }
  `,
  right: ({ theme }) => `
    border-top-right-radius: ${theme.value.borderRadius};
    border-bottom-right-radius: ${theme.value.borderRadius};
  `,
  active: ({ theme, orientation }) => `
    background-color: ${theme.color.primary};
    color: ${theme.color.baseInverse};
    ${theme.mixin.border({ color: theme.color.primary, orientation })}
    &:hover {
      background-color: ${theme.color.primaryDarker};
      ${theme.mixin.border({ color: theme.color.primaryDarker, orientation })}
    }
  `,
}

BaseTabs.Tab = styled.button`
  text-align: ${({ orientation }) => (orientation === 'vertical' ? 'left' : 'center')};
  padding: ${props => props.theme.spacing.xms} ${props => props.theme.spacing.m};
  color: ${props => props.theme.color.baseLighter};
  ${props => props.theme.mixin.border({ orientation: props.orientation })}
  background-color: ${props => props.theme.color.bgLighter};
  ${props => props.theme.mixin.transition()}
  &:hover {
    background-color: ${props => props.theme.color.primaryDarker};
    ${props => props.theme.mixin.border({ color: props.theme.color.primaryDarker, orientation: props.orientation })}
    color: ${props => props.theme.color.baseInverse};
    cursor: pointer;
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
  flex-direction: ${({ orientation }) => ((orientation === 'vertical') ? 'column' : 'row')}
  overflow: scroll;
  ${above.sm`
      overflow:auto;
  `}
`)
