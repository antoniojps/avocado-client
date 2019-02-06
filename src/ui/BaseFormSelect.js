import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-spring'
import { applyStyleModifiers } from 'styled-components-modifiers'
import { P } from 'elements'

const INPUT_MODIFIERS = {
  hover: ({ theme }) => `
    border: 1px solid ${theme.color.base};
  `,
  error: ({ theme }) => `
    border: 1px solid ${theme.color.warning};
  `,
  valid: ({ theme }) => `
    border: 1px solid ${theme.color.success};
  `,
}

const Input = styled.select`
  display: block;
  width: 100%;
  -webkit-appearance: none;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.s};
  margin-bottom: ${props => props.theme.spacing.xxs};
  border-radius: ${props => props.theme.value.borderRadius};
  ${props => props.theme.mixin.border({ size: '1px', color: props.theme.color.borderBtn })};
  background-color: ${props => props.theme.color.bgLighter};
  color: ${props => props.theme.color.baseLighter};
  &::placeholder{
    color: ${props => props.theme.color.baseLighter};
  }
  ${applyStyleModifiers(INPUT_MODIFIERS)};
  &:focus {
    ${props => props.theme.mixin.outline()};
  }
`

Input.Spacing = styled.span`
  margin-bottom: ${props => props.theme.spacing.xs};
`

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

const BaseFormSelect = (props) => {
  const {
    touched, error, options, initial, value, label,
  } = props
  const errorElement = renderError(error)
  const modifiersFromProps = generateModifiersFromProps({ touched, error })

  return (
    <Wrapper>
      {label && <P>{label}</P>}
      <Input {...props} label={label} modifiers={modifiersFromProps} value={value || initial}>
        {options.map(({
          id, value, disabled,
        }) => <option key={id} disabled={disabled} value={id}>{value}</option>)
        }
      </Input>
      {touched && errorElement}
      <Input.Spacing />
    </Wrapper>
  )
}

BaseFormSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  modifiers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      value: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
}

BaseFormSelect.defaultProps = {
  error: null,
  modifiers: [],
  touched: false,
  options: [],
}

export default BaseFormSelect
