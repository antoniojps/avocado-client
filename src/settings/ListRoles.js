import React from 'react'
import withTenant from 'tenant/withTenant'
import { BaseLoader } from 'ui'
import {
  Tag, Subtitle, P,
} from 'elements'
import styled from 'styled-components'
import EditPermissionsModal from './EditPermissionsModal'
import AddRoleForm from './AddRoleForm'

// TODO: Handling de erros
const handleError = (errors) => 'error';

const handleLoading = (getRoles) => {
  getRoles();
  return <BaseLoader message="Loading roles..." />
}

const renderPermissions = (roles, allPermissions) => roles.map(({ id, name, permissions }) => (
  <RoleContainer key={id}>
    <RoleNameContainer>
      <Subtitle modifiers="small">{name}</Subtitle>
      <EditPermissionsModal role={{ id, name, permissions }} allPermissions={allPermissions} />
    </RoleNameContainer>
    {permissions.map(perm => <Tag modifiers="gray" key={perm}>{perm}</Tag>)}
    {(!permissions || permissions.length) === 0 && <P>Role doesn't have permissions</P>}
  </RoleContainer>
))
const ListRoles = ({
  roles, permissions, tenantRolesFailure, getRoles,
}) => {
  if (tenantRolesFailure) return handleError(tenantRolesFailure)
  if (!roles || !permissions) return handleLoading(getRoles)
  return (
    <>
      {renderPermissions(roles, permissions)}
      <AddRoleForm />
    </>
  );
}

const RoleNameContainer = styled.div`
    margin-bottom: ${props => props.theme.spacing.xxms};
    text-transform: capitalize;
    display: flex;
    justify-content: space-between;
`
const RoleContainer = styled.div`
    margin-bottom: ${props => props.theme.spacing.s};
`

/** Styles */


export default withTenant(ListRoles)
