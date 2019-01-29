import styled from 'styled-components'
import { Container, Button } from '.';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ModalCard = styled(Container)`
  position: relative;
  z-index: 11;
  min-width: 320px;
`
export const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 11;
`
export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5
`
