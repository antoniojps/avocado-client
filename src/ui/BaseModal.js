import React from 'react'
import {
  ModalWrapper, CloseButton, ModalCard, ModalBackground,
} from 'elements'
import PropTypes, { element } from 'prop-types'

import Portal from './Portal'

const BaseModal = ({ children, toggle, isOn }) => (
  <Portal>
    {
      isOn && (
        <ModalWrapper>
          <CloseButton modifiers="primary" onClick={toggle}>
            X
          </CloseButton>
          <ModalCard>
            {children}
          </ModalCard>
          <ModalBackground onClick={toggle} />
        </ModalWrapper>
      )
    }
  </Portal>
)

BaseModal.propTypes = {
  children: element.isRequired,
  toggle: PropTypes.func.isRequired,
  isOn: PropTypes.bool,
}
BaseModal.defaultProps = {
  isOn: false,
}
export default BaseModal
