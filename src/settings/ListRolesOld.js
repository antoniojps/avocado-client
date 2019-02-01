import React, { Component } from 'react'
import withTenant from 'tenant/withTenant'
import {
  Tag, Subtitle, Button, P, Title,
} from 'elements'
import {
  BaseToggle, BaseModal, BaseSwitch,
} from 'ui'


class TogglePermissions extends Component {
  constructor(props) {
    super(props);
    const { roles, allPermissions } = this.props;
    this.state = {
      allPermissions,
      roles,
    }
  }

  renderTogglePermissions = (rolePermissions) => {
    console.log('roles permissions', rolePermissions)
    this.state.allPermissions.map(permission => (
      <div style={{ display: 'grid', justifyItems: 'center', alignItems: 'center' }}>
        <P>{permission}</P>
        <BaseSwitch modifiers="noMargin" isChecked={!rolePermissions.includes(permission)} onChange={() => console.log('change')} />
      </div>
    ))
  }

  render() {
    const { roles, allPermissions } = this.state;
    console.log('roles', roles);
    return roles.map(({ id, name, permissions }) => (
      <div key={id} style={{ paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Subtitle modifiers="small">{name}</Subtitle>
          <BaseToggle>
            {({ isOn, toggle }) => (
              <>
                <Button modifiers={['small', 'primary']} onClick={toggle}>Permissions</Button>
                <BaseModal toggle={toggle} isOn={isOn}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr  ', alignItems: 'center',
                  }}
                  >
                    <Title modifiers="small" style={{ marginBottom: '20px' }}>
                      {`Modify permissions of role ${name}`}
                    </Title>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridGap: '15px' }}>
                      {this.renderTogglePermissions(allPermissions, permissions)}
                    </div>

                  </div>
                  <Button modifiers={['primary', 'right']} style={{ display: 'flex', alignSelf: 'flex-end' }}> Save </Button>
                </BaseModal>
              </>
            )}
          </BaseToggle>
        </div>

        {permissions.map(perm => <Tag modifiers="gray" key={perm}>{perm}</Tag>)}
      </div>
    ))
  }
}


const ListRoles = ({
  roles, permissions, tenantRolesLoading, tenantRolesFailure, getRoles,
}) => {
  if (tenantRolesFailure) return 'error'
  if (!roles || !permissions) {
    getRoles();
    return 'loading';
  }
  console.log('-------------->>>>>>>>>>>>>>>>>', roles, permissions)
  return (
    <>
      {<TogglePermissions roles={roles} permissions={permissions} />}
    </>
  )
}
export default withTenant(ListRoles)
