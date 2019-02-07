import styled from 'styled-components'

export const Avatar = styled.div`
    border-radius: 50%;
    background: transparent;
    height: ${props => props.theme.spacing.ms};
    width: ${props => props.theme.spacing.ms};
    margin-left: ${props => props.theme.spacing.xxs};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${props => props.theme.spacing.border};
`
