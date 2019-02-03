import React, { Component } from 'react'
import { Button, P, Title } from 'elements'
import { BaseToggle, BaseModal, BaseSwitch } from 'ui'
import withTenant from 'tenant/withTenant'
import styled from 'styled-components'

const GridToggle = styled.div`
  display: grid;
  grid-template-columns: repeat(4,1fr);
  > div:nth-of-type(even) {
    justify-self: center
  }
  margin-top: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
`

class EditPermissionsModal extends Component {
  constructor(props) {
    super(props);
    const { role: { permissions } } = this.props
    this.state = {
      rolePermissions: permissions,
    }
    this.handlePermissionChange = this.handlePermissionChange.bind(this)
  }

  handlePermissionChange = (perm) => {
    const { rolePermissions } = this.state;
    this.setState({
      rolePermissions: rolePermissions.includes(perm)
        ? rolePermissions.filter(rolePerm => rolePerm !== perm)
        : [...rolePermissions, perm],
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { putRole, role: { id } } = this.props;
    const { rolePermissions } = this.state;
    putRole({ id, permissions: rolePermissions });
  }

  renderModalItems = () => {
    const { allPermissions } = this.props;
    const { rolePermissions } = this.state;
    return allPermissions.map(perm => (
      <div key={perm}>
        <div><P>{perm}</P></div>
        <div>
          <BaseSwitch key={perm} modifiers="noMargin" isChecked={rolePermissions.includes(perm)} onChange={() => this.handlePermissionChange(perm)} />
        </div>
      </div>
    ))
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    const { deleteRole } = this.props;
    deleteRole(id);
  }

  render() {
    const { role: { name, id } } = this.props;
    return (
      <BaseToggle>
        {({ isOn, toggle }) => (
          <>
            <div style={{ float: 'right', display: 'flex' }}>
              {![1, 2, 3].includes(id) && <Button modifiers={['small', 'danger']} onClick={(e) => this.handleDelete(e, id)}>Delete</Button>}
              {![1].includes(id) && <Button modifiers={['small']} onClick={toggle}>Permissions</Button>}
            </div>
            <BaseModal toggle={toggle} isOn={isOn}>
              <Title modifiers="small">
                Modify permissions of role
                {name}
              </Title>
              <GridToggle>
                {this.renderModalItems()}
              </GridToggle>
              <Button modifiers={['primary', 'right']} onClick={(e) => { toggle(); this.handleSubmit(e) }}> Save </Button>
            </BaseModal>
          </>
        )}
      </BaseToggle>
    )
  }
}

export default withTenant(EditPermissionsModal)
