import React from 'react'
import {
  Title,
  P,
  Container,
} from 'elements'
import {
  BasePage,
} from 'ui'
import Example from 'redux/Example'

const PageIndex = () => (
  <BasePage>
    <Container>
      <Title>
        Stores
      </Title>
      <P>
        Redux store usage examples
      </P>
      <Example />
    </Container>
  </BasePage>
)

export default PageIndex
