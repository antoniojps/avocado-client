import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-spring'
import { P, Input, TextArea } from 'elements'

const Error = styled.div`
  display: flex;
  font-size: ${props => props.theme.size.xxxs};
  color: ${props => props.theme.color.warning};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const generateModifiersFromProps = ({ touched, error }) => {
  const modifiers = []
  if (touched) modifiers.push('touched')
  if (touched && error) modifiers.push('error')
  if (touched && !error) modifiers.push('valid')
  return modifiers
}

const renderError = (error) => {
  const hasError = !!error
  return (
    <Transition
      items={hasError}
      from={{ display: 'flex', opacity: 0, height: 0 }}
      enter={{ opacity: 1, height: 'auto' }}
      leave={{ opacity: 0, height: 0 }}
    >
      {hasError => hasError && (props => <Error style={props}>{error}</Error>)
      }
    </Transition>
  )
}

const BaseFormInput = (props) => {
  const {
    touched, error, type, label,
  } = props
  const errorElement = renderError(error)
  const modifiersFromProps = generateModifiersFromProps({ touched, error })
  return (
    <Wrapper>
      {label && <P>{label}</P>}
      {type === 'TEXTAREA'
        ? <TextArea {...props} modifiers={modifiersFromProps} />
        : <Input {...props} modifiers={modifiersFromProps} />
      }
      {touched && errorElement}
      <Input.Spacing />
    </Wrapper>
  )
}

BaseFormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  modifiers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
}

BaseFormInput.defaultProps = {
  error: null,
  modifiers: [],
  touched: false,
}

export default BaseFormInput
