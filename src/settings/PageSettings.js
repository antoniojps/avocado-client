import React from 'react'
import { BasePage } from 'ui'
import FormWorkSpaceSettings from './FormWorkSpaceSettings'

const PageSettings = () => (
  <BasePage page={{
    title: 'Settings',
    subtitle: 'Workspace preferences',
    description: 'Use this section to update your workspace settings, choose your favourite theme, and add a simple description of your company.',
  }}
  >
    <FormWorkSpaceSettings />
  </BasePage>
)

export default PageSettings
