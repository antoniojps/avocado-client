import styled from 'styled-components'

export const Title = styled.h1`
  font-size: ${props => props.theme.size.m};
  color: ${props => props.theme.color.base};
  font-weight: bold;
  margin: 0;
  padding-bottom: ${props => props.theme.spacing.base};
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
