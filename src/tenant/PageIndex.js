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
  let name
  const { tenant } = props
  if (tenant) name = tenant.name || 'Tenant Website'
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
