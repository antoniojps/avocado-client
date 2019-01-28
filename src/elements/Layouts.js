import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'

const CONTAINER_MODIFIERS = {
  small: () => `
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  `,
}

export const Container = styled.div`
    background: ${props => props.theme.color.bgLighter};
    box-shadow: 0 2px 3px 0 rgba(10,10,10,0.10), 0 0 0 1px rgba(10,10,10,0.10);
    border-radius: ${props => props.theme.value.borderRadius};
    padding: ${props => `${props.theme.spacing.s} ${props.theme.spacing.ms}`};
    margin-bottom: ${props => props.theme.spacing.base};
    ${applyStyleModifiers(CONTAINER_MODIFIERS)};
`
