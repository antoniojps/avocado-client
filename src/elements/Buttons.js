import React from 'react'
import styled from 'styled-components'
import Ink from 'react-ink'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { darken } from 'polished'

const BUTTON_MODIFIERS = {
  small: ({ theme }) => `
    padding: ${theme.spacing.xxxs} ${theme.spacing.xxms};
  `,
  primary: ({ theme }) => `
    background-color: ${theme.color.primaryDarker};
    color: ${theme.color.baseInverse};
    border: 1px solid ${theme.color.primaryDarker};
    &:hover {
      background-color: ${darken(0.03, theme.color.primaryDarker)};
      border: 1px solid ${darken(0.03, theme.color.primaryDarker)};
      color: ${theme.color.baseInverse};
      cursor: pointer;
    }
    &:focus {
      color: ${theme.color.baseInverse};
      background-color: ${darken(0.1, theme.color.primaryDarker)};
      border: 1px solid ${darken(0.1, theme.color.primaryDarker)};
    }
    &:active {
      border: 1px solid ${theme.color.primaryDarker};
      background-color: ${theme.color.primaryDarker};
    }
  `,
  danger: ({ theme }) => `
  background-color: ${theme.color.danger};
  color: ${theme.color.baseInverse};
  border: 1px solid ${theme.color.danger};
  &:hover {
    background-color: ${darken(0.06, theme.color.danger)};
    border: 1px solid ${darken(0.06, theme.color.danger)};
    color: ${theme.color.baseInverse};
    cursor: pointer;
  }
  &:focus {
    color: ${theme.color.baseInverse};
    background-color: ${darken(0.1, theme.color.danger)};
    border: 1px solid ${darken(0.1, theme.color.danger)};
  }
  &:active {
    background-color: ${theme.color.danger};
    border: 1px solid ${theme.color.danger};
  }
`,
}

const StyledButton = styled.button.attrs({ type: 'button' })`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.base};
  border: 1px solid ${props => props.theme.color.borderBtn};
  box-shadow: 0 2px 2px 0 rgba(10,10,10,0.04);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.base};
  border-radius: ${props => props.theme.value.borderRadius};
  background-color: ${props => props.theme.color.bgLighter};
  color: ${props => props.theme.color.baseLighter};
  ${props => props.theme.mixin.transition()}
  &:hover {
    background-color: ${props => darken(0.04, props.theme.color.bgLighter)};
    color: ${props => props.theme.color.base};
    cursor: pointer;
  }
  &:focus {
    outline: 0;
    color: ${props => props.theme.color.base};
    background-color: ${props => darken(0.03, props.theme.color.bg)};
  }
  &:active {
    background-color: ${props => props.theme.color.bgLighter};
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`

export const Button = ({
  children, modifiers, onClick, className,
}) => (
  <StyledButton modifiers={modifiers} onClick={onClick} className={className}>
    {children}
    <Ink />
  </StyledButton>
)
