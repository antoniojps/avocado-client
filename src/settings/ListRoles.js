import React from 'react'
import withTenant from 'tenant/withTenant'
import { BaseLoader } from 'ui'
import {
  Tag, Subtitle,
} from 'elements'
import styled from 'styled-components'

// TODO: Handling de erros
const handleError = (errors) => 'error';

const handleLoading = (getRoles) => {
  getRoles();
  return <BaseLoader message="Loading roles..." />
}

const renderPermissions = (roles, allPermissions) => roles.map(({ id, name, permissions }) => (
  <RoleContainer key={id}>
    <MarginSubtitle modifiers="small">{name}</MarginSubtitle>
    {permissions.map(perm => <Tag modifiers="gray" key={perm}>{perm}</Tag>)}
  </RoleContainer>
))
const ListRoles = ({
  roles, permissions, tenantRolesFailure, getRoles,
}) => {
  if (tenantRolesFailure) return handleError(tenantRolesFailure)
  if (!roles || !permissions) return handleLoading(getRoles)
  return renderPermissions(roles, permissions);
}

const MarginSubtitle = styled(Subtitle)`
    margin-bottom: ${props => props.theme.spacing.xxms};
    text-transform: capitalize;
`
const RoleContainer = styled.div`
    margin-bottom: ${props => props.theme.spacing.s};
`

/** Styles */


export default withTenant(ListRoles)
