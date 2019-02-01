import React, { Component } from 'react'
import BaseForm, { inputTypes } from 'ui/BaseForm';
import {
  BaseFormInput, BaseToggle, BaseModal, BaseSwitch,
} from 'ui'
import {
  Button, Title, Tag, P, Subtitle,
} from 'elements'

class Roles extends Component {
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
      onChange={this.props.onChange}
    />
  )

  renderSubmitButton = () => (
    <Button type="submit" modifiers="primary">Add role</Button>
  )

  renderAddPermissions = () => (
    <Button type="submit" modifiers="primary">Add role</Button>
  )

  render() {
    const allPermissions = [
      'add users',
      'edit users',
      'test sada',
      'add users',
      'edit usersaaaaaaaa',
      'test sada',
      'add users',
      'edit users',
      'test sada',
    ]
    const roles = [
      {
        id: '1',
        name: 'Admin',
        permissions: [
          'add users',
          'edit users',
          'test sada',
        ],
      },
      {
        id: '2',
        name: 'Normal',
        permissions: [
          'add users',

        ],
      },
      {
        id: '3',
        name: 'Manager',
        permissions: [
          'add users',
          'add users',
          'add usersaaaa',
          'add users',
        ],
      },
    ]
    const {
      ROLE,
    } = inputTypes

    const form = {
      name: 'Tenant create form',
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


        {roles.map(({ id, name, permissions }) => (
          <div
            key={id}
            style={{
              display: 'grid', gridTemplateColumns: '3fr 1fr', alignItems: 'center', paddingBottom: '15px',
            }}
          >
            <div>
              <P>{name}</P>
              {permissions.map(perm => <Tag>{perm}</Tag>)}
            </div>
            <BaseToggle>
              {({ isOn, toggle }) => (
                <>
                  <Button modifiers="primary" onClick={toggle}>
                    Permissions
                  </Button>
                  <BaseModal toggle={toggle} isOn={isOn}>
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr  ', alignItems: 'center',
                    }}
                    >
                      <Title modifiers="small">Modify permissions of role admin</Title>
                      {allPermissions.map(perm => (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <P>{perm}</P>
                          <BaseSwitch isChecked={!permissions.includes(perm)} onChange={this.handleSwitchChange} />
                        </div>
                      ))}
                    </div>
                    <Button modifiers="primary" style={{ display: 'flex', alignSelf: 'flex-end' }}> Save </Button>
                  </BaseModal>
                </>
              )}
            </BaseToggle>


          </div>
        ))}


      </div>
    )
  }
}
export default Roles
