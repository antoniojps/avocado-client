import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Container, Title, P, Button,
} from 'elements'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import { BaseFormInput, BaseLoader } from 'ui'
import withAuth from 'user/withAuth'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class PageLogin extends Component {
  componentDidMount = () => {
    this.redirectAuthenticatedUser()
  }

  componentDidUpdate = () => {
    this.redirectAuthenticatedUser()
  }

  redirectAuthenticatedUser = () => {
    const { userAuthenticated, history, gatherRedirect } = this.props
    const path = gatherRedirect === '/login' ? '/' : gatherRedirect
    if (userAuthenticated) history.push(path)
  }

  onSubmit = ({ EMAIL: email, PASSWORD: password }) => {
    const { userLoading } = this.props
    const { login } = this.props
    if (!userLoading) login({ email, password })
  }

  renderSubmitButton = () => {
    const { userLoading, userFailure } = this.props
    if (userFailure && !userLoading) {
      const { msg } = userFailure
      return (
        <>
          <Error>{msg}</Error>
          <Button type="submit" modifiers="primary" isLoading={userLoading}>Login</Button>
        </>
      )
    }
    return (
      <Button type="submit" modifiers="primary" isLoading={userLoading}>Login</Button>
    )
  }

  renderLoader = () => (
    <BaseLoader message="Creating workspace..." />
  )

  renderSuccess = () => (
    <Button pulse modifiers={['primary']} onClick={this.handleReddirect}>
      Logged in!
    </Button>
  )

  renderInput = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <BaseFormInput
      {...field}
      {...props}
      type="text"
      autoComplete="username"
      touched={touched[field.name]}
      error={errors[field.name]}
    />
  )

  renderInputPassword = ({ field, form: { touched, errors }, ...props }) => (
    <BaseFormInput
      {...field}
      {...props}
      type="password"
      autoComplete="new-password"
      touched={touched[field.name]}
      error={errors[field.name]}
    />
  )

  render() {
    const { EMAIL, PASSWORD } = inputTypes

    const form = {
      name: 'Login',
      language: 'en-us',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: EMAIL,
          name: EMAIL,
          type: EMAIL,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Email',
          component: this.renderInput,
        },
        {
          id: PASSWORD,
          name: PASSWORD,
          type: PASSWORD,
          initialValue: '',
          validation: false,
          required: true,
          placeholder: 'Password',
          component: this.renderInputPassword,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return (
      <Wrapper>
        <Container>
          <Title modifiers="big">
          Sonae
          </Title>
          <P>
          Workspace
          </P>
          <Title>
            Login
          </Title>
          <BaseForm form={form} />
        </Container>
      </Wrapper>
    )
  }
}

const Error = styled(P)`
  color: ${props => props.theme.color.danger};
`

const Wrapper = styled.div`
    padding: ${props => props.theme.spacing.base};
    width: 100%;
    height: 100%;
    ${props => props.theme.gradient.bg()};
    ${Container} {
      max-width: ${props => props.theme.width.m};
      margin-left: auto;
      margin-right: auto;
      margin-top: ${props => props.theme.spacing.xxl};
    }
`

PageLogin.propTypes = {
  userLoading: PropTypes.bool.isRequired,
  userAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  gatherRedirect: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
}

PageLogin.defaultProps = {

}

export default withRouter(withAuth(PageLogin))
