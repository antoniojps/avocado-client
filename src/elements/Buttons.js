import React from 'react'
import styled from 'styled-components'
import Ink from 'react-ink'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { lighten, darken } from 'polished'

const BUTTON_MODIFIERS = {
  small: ({ theme }) => `
    padding: ${theme.spacing.xxxs} ${theme.spacing.xxms};
  `,
  primary: ({ theme }) => `
    background-color: ${theme.color.primary};
    color: ${theme.color.baseInverse};
    &:hover {
      background-color: ${theme.color.primaryDarker};
      border: 1px solid ${theme.color.primaryDarker};
      color: ${theme.color.baseInverse};
      cursor: pointer;
    }
    &:focus {
      border: 1px solid ${darken(0.15, theme.color.primary)};
    }
    &:active {
      background-color: ${theme.color.primary};
      border: 1px solid ${theme.color.primary};
    }
  `,
  danger: ({ theme }) => `
  background-color: ${theme.color.danger};
  color: ${theme.color.baseInverse};
  &:hover {
    background-color: ${theme.color.dangerDarker};
    border: 1px solid ${theme.color.dangerDarker};
    color: ${theme.color.baseInverse};
    cursor: pointer;
  }
  &:focus {
    border: 1px solid ${darken(0.15, theme.color.danger)};
  }
  &:active {
    background-color: ${theme.color.danger};
    border: 1px solid ${theme.color.danger};
  }
`,
}

const StyledButton = styled.button`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.base};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.base};
  box-shadow: 0 2px 3px 0 rgba(10,10,10,0.10), 0 0 0 1px rgba(10,10,10,0.10);
  border-radius: ${props => props.theme.value.borderRadius};
  background-color: ${props => props.theme.color.bgLighter};
  color: ${props => props.theme.color.baseLighter};
  ${props => props.theme.mixin.transition()}
  &:hover {
    background-color: ${props => lighten(0.02, props.theme.color.bg)};
    border: 1px solid ${props => props.theme.color.primary};
    color: ${props => props.theme.color.base};
    cursor: pointer;
  }
  &:focus {
    outline: 0;
    border: 1px solid ${props => props.theme.color.primary};
  }
  &:active {
    background-color: ${props => props.theme.color.bgLighter};
    border: 1px solid ${props => props.theme.color.border};
  }
  ${applyStyleModifiers(BUTTON_MODIFIERS)};
`

export const Button = ({ children, modifiers, onClick }) => (
  <StyledButton modifiers={modifiers} onClick={onClick}>
    {children}
    <Ink />
  </StyledButton>
)
