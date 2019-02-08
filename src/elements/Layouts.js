import styled from 'styled-components'
import { applyStyleModifiers } from 'styled-components-modifiers'

const CONTAINER_MODIFIERS = {
  small: () => `
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
  `,
}

export const Seperator = styled.div`
  height: 2px;
  width: 100%;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.32) 15%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.36) 85%, rgba(255,255,255,0.00) 100%);
  margin-top: ${props => props.theme.spacing.s};
`

export const Row = styled.section`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

export const Container = styled.div`
    background: ${props => props.theme.color.bgLighter};
    box-shadow: 0 2px 3px 0 rgba(10,10,10,0.10), 0 0 0 1px rgba(10,10,10,0.10);
    border-radius: ${props => props.theme.value.borderRadius};
    padding: ${props => `${props.theme.spacing.s} ${props.theme.spacing.ms}`};
    margin-bottom: ${props => props.theme.spacing.base};
    ${applyStyleModifiers(CONTAINER_MODIFIERS)};
`

export const CenterDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
`
/** Dont blame me, component is external and dont supports theme provider */
export const PopUp = styled(Container)`

`
