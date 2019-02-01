import React, { Component } from 'react'
import { BasePage, BaseTabs } from 'ui'
import {
  Title,
  P,
  Button,
  Container,
  Subtitle,
} from 'elements'
import Roles from 'settings/Roles'

class PageSettings extends Component {
  render() {
    return (
      <BasePage>
        <Container>
          <Title>Preferences</Title>
        </Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gridGap: '30px' }}>
          <BaseTabs orientation="vertical">
            <BaseTabs.Tab to="/settings">
              Tenant preferences
            </BaseTabs.Tab>
            <BaseTabs.Tab to="/settings/roles">
              Roles and permissions
            </BaseTabs.Tab>
            <BaseTabs.Tab to="/settings/other">
              Other
            </BaseTabs.Tab>
          </BaseTabs>
          <div>
            <Title>Roles</Title>
            <Subtitle style={{ marginBottom: '15px' }}>Aqui podes configurar o teu tenant</Subtitle>
            <Container>
              <Roles />


            </Container>
          </div>

        </div>
      </BasePage>
    )
  }
}
export default PageSettings
