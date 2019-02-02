import React from 'react'
import { BasePage } from 'ui'
import styled from 'styled-components'
import ListRoles from './ListRoles'

const ListContainer = styled.div`
    padding: ${props => `${props.theme.spacing.s} ${props.theme.spacing.ms} 0`};
`

const renderDescription = () => (
  <>
    <p>Role indicates the level or title of the person within the organization. Examples include:</p>
    <ListContainer>
      <ul>
        <li>Admin - person who can manage platform with all permissions</li>
        <li>Manager - person who can manage other users events</li>
        <li>Normal - person who can  dsadsadsadsx </li>
      </ul>
    </ListContainer>

  </>
)

const PageRoles = () => (
  <BasePage page={{
    title: 'Settings',
    subtitle: 'Roles',
    description: renderDescription(),
  }}
  >
    <ListRoles />
  </BasePage>
)

export default PageRoles
