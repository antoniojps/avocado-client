import React, { Component } from 'react';
import styled from 'styled-components'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import PropTypes from 'prop-types'
import { BaseFormInput, BaseLoader } from 'ui'
import { Button } from 'elements'
import { createTenant, callPropFunc } from 'utilities'
import illustrationSuccess from 'assets/success.svg'

class TenantCreateForm extends Component {
  state = {
    tenant: null,
    loading: false,
    failure: false,
    reddirectUrl: null,
  }

  // api request
  createTenant = async (values) => {
    const {
      EMAIL: email, FIRST_NAME, LAST_NAME, PASSWORD, REPEAT_PASSWORD, SUBDOMAIN: fqdn,
    } = values
    const tenantNew = await createTenant({
      email,
      name: `${FIRST_NAME} ${LAST_NAME}`,
      password: PASSWORD,
      password_confirmation: REPEAT_PASSWORD,
      fqdn,
    })
    return tenantNew
  }


  onSubmit = async (values, actions) => {
    const { handleLoading, handleFailure, handleSuccess } = this.props
    try {
      // loading
      this.setState(() => ({ loading: true, tenant: null, failure: false }))
      callPropFunc(handleLoading)
      const { data: { reddirectUrl } } = await this.createTenant(values)
      // success
      this.setState(() => ({
        loading: false, reddirectUrl, tenant: { subdomain: 'sonae' }, failure: false,
      }))
      callPropFunc(handleSuccess({ tenant: { subdomain: 'sonae' } }))
    } catch (error) {
      console.log(error)
      this.setState(() => ({ loading: false, tenant: null, failure: true }))
      callPropFunc(handleFailure)
    }
  }

  renderSubmitButton = () => (
    <Button type="submit" modifiers="primary">Create workspace</Button>
  )

  renderLoader = () => (
    <BaseLoader message="Creating workspace..." />
  )

  handleReddirect = (e) => {
    e.preventDefault();
    const { reddirectUrl } = this.state;
    window.location.replace(reddirectUrl);
  }

  renderSucces = () => (
    <Success>
      <Button pulse modifiers={['primary']} onClick={this.handleReddirect}>
        Go to your workspace and login
      </Button>
      <img src={illustrationSuccess} alt="success arrow illustration" />
    </Success>
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
        onChange={(event) => this.handleChangeCostum(event, { field, errors })}
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
      onChange={(event) => this.handleChangeCostum(event, { field, errors })}
    />
  )

  isSubdomainValid = (subdomain) => {
    const hasInvalidRegex = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/i.test(subdomain)
    return !hasInvalidRegex
  }

  handleChangeCostum = (event, { field, errors }) => {
    const { handleSubdomainChange } = this.props
    const { onChange, name } = field
    const { SUBDOMAIN } = inputTypes
    const { value: subdomain } = event.target

    // formik handler
    onChange(event)

    const subdomainValid = this.isSubdomainValid(subdomain)

    // costum handler from prop
    if (name === SUBDOMAIN && typeof handleSubdomainChange === 'function' && subdomainValid) {
      handleSubdomainChange(event, event.target.value)
    }
  }

  render() {
    const { tenant, loading } = this.state
    const {
      EMAIL, FIRST_NAME, LAST_NAME, SUBDOMAIN, PASSWORD, REPEAT_PASSWORD,
    } = inputTypes

    const form = {
      name: 'Tenant create form',
      language: 'en-us',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: FIRST_NAME,
          name: FIRST_NAME,
          type: FIRST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Primeiro nome',
          component: this.renderInput,
        },
        {
          id: LAST_NAME,
          name: LAST_NAME,
          type: LAST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Último nome',
          component: this.renderInput,
        },
        {
          id: EMAIL,
          name: EMAIL,
          type: EMAIL,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'E-mail',
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
          placeholder: 'Confirm password',
          component: this.renderInputPassword,
        },
        {
          id: SUBDOMAIN,
          name: SUBDOMAIN,
          type: SUBDOMAIN,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Subdomínio',
          component: this.renderInput,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return (
      <>
        {(!tenant && !loading)
          && <BaseForm form={form} />
        }
        {loading
          && this.renderLoader()
        }
        {tenant
          && this.renderSucces()
        }
      </>
    );
  }
}

const Success = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    animation: ${props => props.theme.animation.pop} 1s ease;
    padding-top: ${props => props.theme.spacing.base};
  }
`

TenantCreateForm.propTypes = {
  handleSubdomainChange: PropTypes.func,
  handleLoading: PropTypes.func,
  handleSuccess: PropTypes.func,
  handleFailure: PropTypes.func,
}

TenantCreateForm.defaultProps = {
  handleSubdomainChange: null,
  handleLoading: null,
  handleSuccess: null,
  handleFailure: null,
}

export default TenantCreateForm;
