import React from 'react'
import PropTypes, { element } from 'prop-types'
import { ThePortal, BaseBreadcrumb, BaseBreakpoints } from 'ui'
import { Container, Icon } from 'elements'
import styled, { withTheme } from 'styled-components'
import { transparentize } from 'polished'
import { above } from 'utilities'
import { Transition } from 'react-spring'

const BaseModal = ({
  children, toggle, isOn, theme,
}) => (
  <ThePortal>
    <BaseBreakpoints render={({ sm }) => (sm
      ? (
        <TheModalDesktop isOn={isOn} toggle={toggle} theme={theme}>
          {children}
        </TheModalDesktop>
      )
      : (
        <TheModalMobile isOn={isOn} toggle={toggle} theme={theme}>
          {children}
        </TheModalMobile>
      )
    )}
    />
  </ThePortal>
)

const TheModalMobile = ({
  isOn, toggle, theme, children,
}) => (
  <Transition
    items={isOn}
    from={{ opacity: 0, transform: 'translateY(100%)' }}
    enter={{ opacity: 1, transform: 'translateY(0%)' }}
    leave={{ opacity: 0, transform: 'translateY(100%)' }}
  >
    {isOn => isOn && (props => (
      <TheModal style={props} toggle={toggle} theme={theme}>
        {children}
      </TheModal>
    ))
    }
  </Transition>
)

const TheModalDesktop = ({
  isOn, toggle, theme, children,
}) => (
  <Transition
    items={isOn}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {isOn => isOn && (props => (
      <TheModal style={props} toggle={toggle} theme={theme}>
        {children}
      </TheModal>
    ))
    }
  </Transition>
)

const TheModal = ({
  children, toggle, theme, style,
}) => (
  <Modal style={style}>
    <Modal.Header onClick={toggle}>
      <Modal.Header.Content>
        <BaseBreakpoints render={({ sm }) => (sm
          ? null
          : (<BaseBreadcrumb modifiers="inverse" className="modal__breadcrumb" />)
        )}
        />
        <Icon icon="close" color={theme.color.baseInverse} />
      </Modal.Header.Content>
    </Modal.Header>
    <Modal.Container>
      {children}
    </Modal.Container>
  </Modal>
)

const Modal = styled.div`
  position: fixed;
  overflow-y: scroll;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.color.bgPrimary};
  padding: ${props => props.theme.spacing.base};
  padding-top: ${props => props.theme.spacing.l};
  ${above.sm`
    background-color: ${props => transparentize(0.8, props.theme.color.bgDark)};
  `}
`

Modal.Container = styled(Container)`
  position: relative;
  max-width: ${props => props.theme.width.m};
  overflow: scroll;
  margin-left: auto;
  margin-right: auto;
  margin: ${props => props.theme.spacing.base} auto;
  ${above.sm`
    margin: ${props => props.theme.spacing.l} auto;
  `}
`

Modal.Header = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: ${props => props.theme.spacing.base};
  }
`

Modal.Header.Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${above.sm`
    margin: ${props => props.theme.spacing.l} auto;
    max-width: ${props => props.theme.width.m};
    justify-content: flex-end;
  `}
`

BaseModal.propTypes = {
  children: element.isRequired,
  toggle: PropTypes.func,
  isOn: PropTypes.bool,
}
BaseModal.defaultProps = {
  isOn: false,
  toggle: () => null,
}
export default withTheme(BaseModal)
