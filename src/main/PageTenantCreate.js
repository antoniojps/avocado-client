import React from 'react'
import styled from 'styled-components'
import {
  Icon,
  Title,
  P,
} from 'elements'
import {
  BasePageDivided,
} from 'ui'
import { above } from 'utilities'
import TenantCreateForm from './TenantCreateForm'

const PageIndex = () => (
  <BasePageDivided>
    <Wrapper>
      <Header>
        <Header.Logo>
          <Icon icon="logo" height={49} />
        </Header.Logo>
        <Header.Title>
          Create companies workspace
        </Header.Title>
        <P>
          A private database and a unique sob-domain will be created to keep your data secure and independent.
        </P>
      </Header>
      <Form>
        <TenantCreateForm />
      </Form>
    </Wrapper>
  </BasePageDivided>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin-top: 0;
  padding: ${props => props.theme.spacing.base};
  ${above.md`
    margin-top: ${props => props.theme.spacing.xxl};
    padding: ${props => props.theme.spacing.base};
    padding-top: 0;
  `}
`

const Header = styled.div`
  width: 100%;
`

Header.Logo = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: ${props => props.theme.spacing.m};
`

Header.Title = styled(Title)`
  padding-top: 0;
`

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default PageIndex
