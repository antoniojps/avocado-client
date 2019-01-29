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
  }

  // api request
  createTenant = async (values) => {
    // const {
    //   EMAIL: email, FIRST_NAME, LAST_NAME, SUBDOMAIN: fqdn,
    // } = values
    // await this.createTenant({
    //   email,
    //   name: FIRST_NAME + LAST_NAME,
    //   fqdn,
    // })
    return new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })
  }

  onSubmit = async (values, actions) => {
    const { handleLoading, handleFailure, handleSuccess } = this.props
    try {
      // loading
      this.setState(() => ({ loading: true, tenant: null, failure: false }))
      callPropFunc(handleLoading)
      await this.createTenant(values)

      // success
      this.setState(() => ({ loading: false, tenant: { subdomain: 'sonae' }, failure: false }))
      callPropFunc(handleSuccess({ tenant: { subdomain: 'sonae' } }))
    } catch (error) {
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

  renderSucces = () => (
    <Success>
      <img src={illustrationSuccess} alt="success arrow illustration" />
      <Button pulse modifiers={['primary']}>
        Go to your workspace and login
      </Button>
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
      EMAIL, FIRST_NAME, LAST_NAME, SUBDOMAIN,
    } = inputTypes

    const form = {
      name: 'Test form',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: 1,
          name: FIRST_NAME,
          type: FIRST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Primeiro nome',
          component: this.renderInput,
        },
        {
          id: 2,
          name: LAST_NAME,
          type: LAST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Último nome',
          component: this.renderInput,
        },
        {
          id: 3,
          name: EMAIL,
          type: EMAIL,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'E-mail',
          component: this.renderInput,
        },
        {
          id: 4,
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
    padding-bottom: ${props => props.theme.spacing.base};
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
