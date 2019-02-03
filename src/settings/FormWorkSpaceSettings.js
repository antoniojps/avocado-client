import React, { Component } from 'react';
import styled from 'styled-components'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import PropTypes from 'prop-types'
import { BaseFormInput } from 'ui'
import { Button } from 'elements'
import BaseFormSelect from 'ui/BaseFormSelect';
import BaseFormFile from 'ui/BaseFormFile';
import withTenant from 'tenant/withTenant'

class FormWorkSpaceSettings extends Component {
  state = {
    options: [
      { id: 0, value: 'Select theme', disabled: true },
      { id: 1, value: 'Default' },
      { id: 2, value: 'Dark' },
    ],
  }

  onSubmit = ({ COMPANY, SELECT, TEXTAREA }) => {
    const { putTenant } = this.props;
    putTenant({
      name: COMPANY,
      description: TEXTAREA,
      themes_id: SELECT,
    })
  }

  renderSubmitButton = () => (
    <Button type="submit" modifiers="primary">Submit preferences</Button>
  )

  renderInput = ({ field, form: { touched, errors }, ...props }) => (
    <BaseFormInput
      {...field}
      {...props}
      type={props.type}
      autoComplete="username"
      touched={touched[field.name]}
      error={errors[field.name]}
    />
  );

  renderThemeInput = ({ field, form: { touched, errors }, ...props }) => (
    <BaseFormSelect
      {...field}
      {...props}
      type={props.type}
      autoComplete="username"
      touched={touched[field.name]}
      error={errors[field.name]}
      options={this.state.options}
      initial={0}
    />
  )

  renderFileInput = ({ field, form: { touched, errors }, ...props }) => (
    <BaseFormFile
      {...field}
      {...props}
      type={props.type}
      touched={touched[field.name]}
      error={errors[field.name]}
    />
  )

  render() {
    const {
      COMPANY, TEXTAREA, SELECT,
    } = inputTypes
    const { tenant: { name, description, themes_id } } = this.props

    const form = {
      name: 'Tenant edit form',
      language: 'en-us',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: COMPANY,
          name: COMPANY,
          type: COMPANY,
          initialValue: name || '',
          validation: true,
          required: true,
          placeholder: 'Company name',
          label: 'Company name',
          component: this.renderInput,
        },
        {
          id: TEXTAREA,
          name: TEXTAREA,
          type: TEXTAREA,
          initialValue: description || '',
          validation: true,
          required: false,
          placeholder: 'Description',
          label: 'Description',
          component: this.renderInput,
        },
        {
          id: SELECT,
          name: SELECT,
          type: SELECT,
          initialValue: themes_id || 1,
          validation: true,
          required: true,
          placeholder: 'Theme',
          label: 'Theme',
          component: this.renderThemeInput,
        },
        //  {
        //    id: FILE,
        //    name: FILE,
        //    type: FILE,
        //    initialValue: '',
        //    validation: false,
        //    required: false,
        //    placeholder: 'Logo',
        //    component: this.renderFileInput,
        //  },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return (
      <Form>
        <BaseForm form={form} />
      </Form>
    );
  }
}

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center
  `


FormWorkSpaceSettings.propTypes = {
  handleSubdomainChange: PropTypes.func,
  handleLoading: PropTypes.func,
  handleSuccess: PropTypes.func,
  handleFailure: PropTypes.func,
}

FormWorkSpaceSettings.defaultProps = {
  handleSubdomainChange: null,
  handleLoading: null,
  handleSuccess: null,
  handleFailure: null,
}

export default withTenant(FormWorkSpaceSettings)
