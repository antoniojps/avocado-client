import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'

const TAG_MODIFIERS = {
  purple: ({ theme }) => `
    background-color: ${theme.color.purple};
  `,
  inactive: ({ theme }) => `
    background-color: white;
    color: ${theme.color.blue};
    border: 1px solid ${theme.color.blue};
  `,
}

export const Tag = styled.div`
  display: inline-flex;
  padding: ${props => props.theme.spacing.xxxs} ${props => props.theme.spacing.xxms};
  border-radius: ${props => props.theme.value.borderRadius};
  background-color: ${({ theme, color }) => color || theme.color.blue};
  font-size: ${props => props.theme.size.xxxs};
  color: ${props => props.theme.color.baseInverse};
  text-transform: uppercase;
  margin-right: ${props => props.theme.spacing.xxs};
  margin-bottom: ${props => props.theme.spacing.xs};
  ${applyStyleModifiers(TAG_MODIFIERS)};
`
