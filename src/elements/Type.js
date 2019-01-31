import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'

const TITLE_MODIFIERS = {
  inverse: ({ theme }) => `
    color: ${theme.color.baseInverse};
  `,
  big: ({ theme }) => `
    font-size: ${theme.size.m};
  `,
  noMargin: () => `
    padding: 0;
    margin: 0;
  `,
}

export const Title = styled.h1`
  font-size: ${props => props.theme.size.sm};
  color: ${props => props.theme.color.base};
  font-weight: bold;
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.base};
  padding-top: ${props => props.theme.spacing.base};
  ${applyStyleModifiers(TITLE_MODIFIERS)};
`

export const Subtitle = styled.h2`
  font-size: ${props => props.theme.size.s};
  color: ${props => props.theme.color.baseLighter};
  font-weight: 400;
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.xs};
`
export const P = styled.p`
  font-size: ${props => props.theme.size.base};
  color: ${props => props.theme.color.baseLighter};
  font-weight: 400;
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.xs};
  line-height: ${props => props.theme.size.sm};
`
