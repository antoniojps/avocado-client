import React from 'react'
import {
  ModalWrapper, CloseButton, ModalCard, ModalBackground,
} from 'elements'
import PropTypes, { element } from 'prop-types'
import { ThePortal } from 'ui'

const BaseModal = ({ children, toggle, isOn }) => (
  <ThePortal>
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
  </ThePortal>
)

BaseModal.propTypes = {
  children: element.isRequired,
  toggle: PropTypes.func,
  isOn: PropTypes.bool,
}
BaseModal.defaultProps = {
  isOn: false,
  toggle: () => null,
}
export default BaseModal
