import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'


const INPUT_MODIFIERS = {
  hover: ({ theme }) => `
    border: 1px solid ${theme.color.base};
  `,
  error: ({ theme }) => `
    border: 1px solid ${theme.color.warning};
  `,
  valid: ({ theme }) => `
    border: 1px solid ${theme.color.success};
  `,
  noMargin: () => `
    margin: 0
  `,
}

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.s};
  margin-bottom: ${props => props.theme.spacing.xxs};
  border-radius: ${props => props.theme.value.borderRadius};
  ${props => props.theme.mixin.border({ size: '1px', color: props.theme.color.borderBtn })};
  background-color: ${props => props.theme.color.bgLighter};
  color: ${props => props.theme.color.base};
  &::placeholder{
    color: ${props => props.theme.color.baseLighter};
  }
  &:focus {
    ${props => props.theme.mixin.outline()};
  }
  ${applyStyleModifiers(INPUT_MODIFIERS)};
`

Input.Spacing = styled.span`
  margin-bottom: ${props => props.theme.spacing.xs};
`

export const TextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 150px;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.s};
  margin-bottom: ${props => props.theme.spacing.xxs};
  border-radius: ${props => props.theme.value.borderRadius};
  ${props => props.theme.mixin.border({ size: '1px', color: props.theme.color.borderBtn })};
  background-color: ${props => props.theme.color.bgLighter};
  color: ${props => props.theme.color.base};
  &::placeholder{
    color: ${props => props.theme.color.baseLighter};
  }
  &:focus {
    ${props => props.theme.mixin.outline()};
  }
  ${applyStyleModifiers(INPUT_MODIFIERS)};
`
