import React, { Component } from 'react';
import BaseForm, { inputTypes } from 'ui/BaseForm';
import PropTypes from 'prop-types'
import { BaseFormInput } from 'ui'
import { Button } from 'elements'

class TenantCreateForm extends Component {
  onSubmit = (values, actions) => {
    console.log('onSubmit');
    console.log(values)
  }

  renderSubmitButton = () => (
    <Button type="submit" modifiers="primary">Create workspace</Button>
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
        <BaseForm form={form} />
      </>
    );
  }
}

TenantCreateForm.propTypes = {
  handleSubdomainChange: PropTypes.func,
}

TenantCreateForm.defaultProps = {
  handleSubdomainChange: null,
}

export default TenantCreateForm;
