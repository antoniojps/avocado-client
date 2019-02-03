import React from 'react'
import {
  Title,
  P,
} from 'elements'
import {
  BasePage,
} from 'ui'
import withTenant from 'tenant/withTenant'

const PageIndex = (props) => {
  const { tenant } = props
  const name = (tenant && tenant.name) || 'Tenant website'
  return (
    <BasePage page={{
      title: name,
    }}
    >
      <Title>
        Tenant Website
      </Title>
      <P>
        Avocado is a management and planning platform of food safety audits and their resources.
      </P>
    </BasePage>
  )
}

export default withTenant(PageIndex)
