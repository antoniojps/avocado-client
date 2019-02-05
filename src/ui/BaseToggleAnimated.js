import React from 'react'
import { Transition } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseToggleAnimated = ({ isOn, children }) => (
  <Transition
    items={isOn}
    from={{ height: 0,}}
    enter={{ height: 'auto' }}
    leave={{ height: 0 }}
  >
    {isOn => isOn && (props => (
      <Wrapper style={props}>
        {children}
      </Wrapper>
    ))
    }
  </Transition>
)

export default BaseToggleAnimated

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
`

BaseToggleAnimated.propTypes = {
  isOn: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

BaseToggleAnimated.defaultProps = {
  isOn: false,
}
