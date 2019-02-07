import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Container, Title, P, Button, Subtitle,
} from 'elements'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import { BaseFormInput, BaseLoader } from 'ui'
import withAuth from 'user/withAuth'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { above, registerTokenValidate, toast } from 'utilities'
import withTenant from 'tenant/withTenant'

class PageRegister extends Component {
  state = {
    token: null,
    tokenLoading: false,
    tokenFailure: false,
  }

  componentDidMount = () => {
    const { history, userAuthenticated, match: { params } } = this.props
    const { token } = params
    if (userAuthenticated) return history.push('/')
    if (token) {
      this.validateToken(token)
    } else {
      this.setState(() => ({
        token: null, tokenLoading: false, tokenFailure: true,
      }))
    }
  }

  validateToken = async (token) => {
    try {
      this.setState(() => ({
        token: null, tokenLoading: true, tokenFailure: false,
      }))
      const res = await registerTokenValidate(token)
      const tokenData = res.data.user
      this.setState(() => ({
        token: tokenData, tokenLoading: false, tokenFailure: false,
      }))
    } catch (err) {
      this.setState(() => ({
        token: null, tokenLoading: false, tokenFailure: true,
      }))
      toast.error('This invite is not valid')
    }
  }

  componentDidUpdate = (prevProps) => {
    const { userAuthenticated: prevUserAuthenticated } = prevProps
    const { userAuthenticated, history } = this.props
    if (userAuthenticated !== prevUserAuthenticated) {
      if (userAuthenticated) history.push('/gather/register')
    }
  }

  onSubmit = ({
    EMAIL: email, PASSWORD: password, REPEAT_PASSWORD: passwordRepeat, FIRST_NAME: firstName, LAST_NAME: lastName,
  }) => {
    const { registerLoading, register } = this.props
    const { match: { params: { token } } } = this.props
    const actionData = {
      token,
      email,
      password,
      password_confirmation: passwordRepeat,
      name: `${firstName} ${lastName}`,
    }
    if (!registerLoading) register(actionData)
  }

  renderSubmitButton = () => {
    const { registerLoading, registerFailure } = this.props
    if (registerFailure && !registerLoading) {
      const { msg } = registerFailure
      return (
        <>
          <Error>{msg || 'Something went wrong'}</Error>
          <Button type="submit" modifiers="primary" isLoading={registerLoading}>Register</Button>
        </>
      )
    }
    return (
      <Button type="submit" modifiers="primary" isLoading={registerLoading}>Register</Button>
    )
  }

  renderLoader = () => (
    <BaseLoader message="Validating invitation..." />
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

  renderInputDisabled = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <BaseFormInput
      {...field}
      {...props}
      type="text"
      touched={touched[field.name]}
      error={errors[field.name]}
      disabled
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
    const { tenant, registerLoading } = this.props
    const { token, tokenLoading, tokenFailure } = this.state
    const nameArr = (token && token.name.split(' ')) || ['', '']
    const firstNameFromToken = nameArr[0]
    const lastNameFromToken = nameArr[1]
    const emailFromToken = token && token.email

    const {
      EMAIL, PASSWORD, REPEAT_PASSWORD, FIRST_NAME, LAST_NAME,
    } = inputTypes

    const form = {
      name: 'Register',
      language: 'en-us',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: EMAIL,
          name: EMAIL,
          type: EMAIL,
          initialValue: emailFromToken || '',
          validation: true,
          required: true,
          placeholder: 'Email',
          component: this.renderInputDisabled,
        },
        {
          id: FIRST_NAME,
          name: FIRST_NAME,
          type: FIRST_NAME,
          initialValue: firstNameFromToken,
          validation: true,
          required: true,
          placeholder: 'First name',
          component: this.renderInput,
        },
        {
          id: LAST_NAME,
          name: LAST_NAME,
          type: LAST_NAME,
          initialValue: lastNameFromToken,
          validation: true,
          required: true,
          placeholder: 'Last name',
          component: this.renderInput,
        },
        {
          id: PASSWORD,
          name: PASSWORD,
          type: PASSWORD,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Password',
          component: this.renderInputPassword,
        },
        {
          id: REPEAT_PASSWORD,
          name: REPEAT_PASSWORD,
          type: REPEAT_PASSWORD,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Repeat password',
          component: this.renderInputPassword,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return (
      <Wrapper>
        <Container>
          <Title modifiers="big">
            Invitation for
            {' '}
            {tenant.name}
          </Title>
          {tenant.description && (
            <Subtitle>
              {tenant.description}
            </Subtitle>
          )}
          <P>
            Workspace
          </P>
          <Title>
            Register
          </Title>
          {(registerLoading || tokenLoading)
            && this.renderLoader()
          }
          {token && <BaseForm form={form} />}
          {tokenFailure && (
            <>
              <P>
                Invitiation invalid, please contact the workspace's admin.
              </P>
              <P modifiers="small">
                If this persists please contact support@avocado.pt
              </P>
            </>
          )}
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
    display: flex;
    ${above.md`
      align-items: center;
    `}
    ${props => props.theme.gradient.bg()};
    ${Container} {
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      ${above.md`
        width: ${props => props.theme.width.m};
      `}
    }
`

PageRegister.propTypes = {
  userLoading: PropTypes.bool.isRequired,
  userAuthenticated: PropTypes.bool.isRequired,
  userFailure: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  gatherRedirect: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
}

PageRegister.defaultProps = {

}

export default withRouter(withTenant(withAuth(PageRegister)))
