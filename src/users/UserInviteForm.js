import React, { Component } from 'react';
import BaseForm, { inputTypes } from 'ui/BaseForm';
import PropTypes from 'prop-types'
import {
  BaseFormInput, BaseLoader, BaseFormSelect,
} from 'ui'
import { Button } from 'elements'
import withTenant from 'tenant/withTenant'
import { capitalize, toast } from 'utilities'
import { inviteUser } from 'utilities/requests'

class UserInviteForm extends Component {
  state = {
    data: null,
    loading: false,
    failure: false,
  }

  componentDidMount = () => {
    const { getRoles } = this.props
    getRoles()
  }

  getRoleFromId = (roleId) => {
    const rolesArr = this.computedRoles()
    const role = rolesArr.find(({ id }) => id === Number(roleId))
    if (!role) return null
    const { value } = role
    return value.toLowerCase()
  }

  // api request
  inviteUserRequest = async (values) => {
    const {
      EMAIL, FIRST_NAME, LAST_NAME, SELECT,
    } = values
    const role = this.getRoleFromId(SELECT)
    const params = {
      email: EMAIL,
      name: `${FIRST_NAME} ${LAST_NAME}`,
      role,
    }
    return inviteUser(params)
  }

  onSubmit = async (values, actions) => {
    const { EMAIL, FIRST_NAME, LAST_NAME } = values

    try {
      // loading
      this.setState(() => ({ loading: true, data: null, failure: false }))
      const data = await this.inviteUserRequest(values)
      // success
      this.setState(() => ({
        loading: false, data, failure: false,
      }))
      toast.success(`${FIRST_NAME} ${LAST_NAME} invited with the email ${EMAIL}`)
    } catch (error) {
      this.setState(() => ({
        loading: false, data: null, failure: true,
      }))
      toast.warning('Error inviting user')
      if (error.response && error.response.data) {
        console.log('Error inviting')
      } else {
        console.log('Error inviting')
      }
    }
  }

  renderSubmitButton = () => {
    const { loading } = this.state
    return <Button type="submit" modifiers="primary" isLoading={loading}>Invite to workspace</Button>
  }

  renderLoader = () => (
    <BaseLoader message="Inviting user..." />
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

  computedRoles = () => {
    const { roles } = this.props
    if (!roles) return []
    const options = roles.map(({ id, name }) => ({
      id,
      value: capitalize(name),
    }))
    options.reverse()
    options.unshift({ id: 0, value: 'Select role', disabled: true })
    return options
  }

  renderInputRoles = ({ field, form: { touched, errors }, ...props }) => {
    const options = this.computedRoles()
    return (
      <BaseFormSelect
        {...field}
        {...props}
        type={props.type}
        touched={touched[field.name]}
        error={errors[field.name]}
        options={options}
        initial={0}
      />
    )
  }

  render() {
    this.computedRoles()
    const { loading } = this.state
    const { tenantRolesLoading } = this.props
    const isLoading = loading || tenantRolesLoading
    const {
      EMAIL, FIRST_NAME, LAST_NAME, SELECT,
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
          placeholder: 'First name',
          component: this.renderInput,
        },
        {
          id: LAST_NAME,
          name: LAST_NAME,
          type: LAST_NAME,
          initialValue: '',
          validation: true,
          required: true,
          placeholder: 'Last name',
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
          id: SELECT,
          name: SELECT,
          type: SELECT,
          initialValue: 0,
          validation: true,
          required: true,
          placeholder: 'Type',
          label: 'Type',
          component: this.renderInputRoles,
        },
      ],
      submitButton: this.renderSubmitButton(),
    }

    return (
      <>
        {isLoading
          ? <BaseLoader />
          : <BaseForm form={form} />
        }
      </>
    );
  }
}


UserInviteForm.propTypes = {
  getRoles: PropTypes.func.isRequired,
}

UserInviteForm.defaultProps = {
}

export default withTenant(UserInviteForm);
