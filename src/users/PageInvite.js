import React from 'react'
import { BasePage } from 'ui'
import BasePermission from 'user/BasePermission'
import { INVITE_USERS } from 'user/permissions'
import UserInviteForm from './UserInviteForm'

const PageInvite = () => (
  <BasePage page={{
    title: 'Invite',
    subtitle: 'Invite users to workspace',
    description: 'As a security measure, you must first invite users before they can register to your workspace',
  }}
  >
    <BasePermission required={INVITE_USERS} redirect="/team">
      <UserInviteForm />
    </BasePermission>
  </BasePage>
)

export default PageInvite
