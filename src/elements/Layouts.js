import styled from 'styled-components'
import { above } from 'utilities'

export const Layout = styled.div`
    width: 100%;
    height: 100%;
    padding: ${props => props.theme.spacing.base};
    ${above.md`
        padding: ${props => `${props.theme.spacing.m} ${props.theme.spacing.xl}`};
    `}
`

export const Container = styled.div`
    background: ${props => props.theme.color.bgLighter};
    box-shadow: 0 2px 3px 0 rgba(10,10,10,0.10), 0 0 0 1px rgba(10,10,10,0.10);
    border-radius: ${props => props.theme.value.borderRadius};
    padding: ${props => `${props.theme.spacing.s} ${props.theme.spacing.ms}`};
    margin-bottom: ${props => props.theme.spacing.base};

`
