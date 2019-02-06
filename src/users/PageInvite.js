import React from 'react'
import { BasePage } from 'ui'
import UserInviteForm from './UserInviteForm'

const PageInvite = () => (
  <BasePage page={{
    title: 'Invite',
    subtitle: 'Invite users to workspace',
    description: 'As a security measure, you must first invite users before they can register to your workspace',
  }}
  >
    <UserInviteForm />
  </BasePage>
)

export default PageInvite
