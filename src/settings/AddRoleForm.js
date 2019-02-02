import React, { Component } from 'react'
import { Subtitle, Button } from 'elements'
import styled from 'styled-components'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import { BaseFormInput } from 'ui'
import withTenant from 'tenant/withTenant';

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center
`

class AddRoleForm extends Component {
  onSubmit = ({ ROLE }) => {
    const { postRole } = this.props;
    postRole(ROLE);
  };

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

  renderSubmitButton = () => (
    <Button type="submit" modifiers="primary">Submit role</Button>
  )

  render() {
    const {
      ROLE,
    } = inputTypes
    const form = {
      name: 'Role add form',
      language: 'en-us',
      onSubmit: (values, actions) => this.onSubmit(values, actions),
      inputs: [
        {
          id: ROLE,
          name: ROLE,
          type: ROLE,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Role name',
          component: this.renderInput,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }
    return (
      <div>
        <Subtitle>
          Add new Role
        </Subtitle>
        <Form>
          <BaseForm form={form} />
        </Form>
      </div>
    )
  }
}
export default withTenant(AddRoleForm)
