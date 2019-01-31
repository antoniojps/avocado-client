import React from 'react'
import {
  Title,
  P,
  Container,
} from 'elements'
import {
  BasePage,
} from 'ui'
import withTenant from 'tenant/withTenant'

const PageIndex = (props) => {
  const { tenant: { name } } = props;
  console.log(props.tenant);
  return (
    <BasePage>
      <Container>
        <Title>
          {name || 'Tenant Website'}
        </Title>
        <P>
        Avocado is a management and planning platform of food safety audits and their resources.
        </P>
      </Container>
    </BasePage>
  )
}

export default withTenant(PageIndex)
