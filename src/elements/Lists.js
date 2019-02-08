import styled from 'styled-components'

export const List = styled.ul`
  color: ${props => props.theme.color.baseLighter};
  list-style-position: inside;
  padding-bottom: ${props => props.theme.spacing.xxs};
  li {
    color: ${props => props.theme.color.baseLighter};
    padding-bottom: ${props => props.theme.spacing.xxs};
  }
`
