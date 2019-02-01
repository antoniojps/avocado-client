import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-spring'
import { applyStyleModifiers } from 'styled-components-modifiers'

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

const Input = styled.input`
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
  visibility: hidden
`

Input.Spacing = styled.span`
  margin-bottom: ${props => props.theme.spacing.xs};
`

const Button = styled.button`
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
    margin-top: -55px;
    text-align: left;
    cursor: pointer;
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

const BaseFormFile = (props) => {
  const {
    touched, error,
  } = props
  const errorElement = renderError(error)
  const modifiersFromProps = generateModifiersFromProps({ touched, error })
  let inputElement = null;

  return (
    <Wrapper>
      <Input ref={input => inputElement = input} type="file" {...props} modifiers={modifiersFromProps} accept="image/png, image/jpeg" />
      {touched && errorElement}
      <Button onClick={() => inputElement.click()}>
        Upload a logo
      </Button>
      <Input.Spacing />
    </Wrapper>
  )
}

BaseFormFile.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  modifiers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
}

BaseFormFile.defaultProps = {
  error: null,
  modifiers: [],
  touched: false,
}

export default BaseFormFile
