import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Icon,
  Title,
  P,
  Subtitle,
} from 'elements'
import {
  BasePageDivided,
} from 'ui'
import { above } from 'utilities'
import TenantCreateForm from './TenantCreateForm'

const defaultSubdomain = 'your-company'

export default class PageTenantCreate extends Component {
  state = {
    subdomain: defaultSubdomain,
  }

  handleSubdomainChange = (event, value) => {
    const { subdomain: subdomainState } = this.state
    const subdomainNew = value
    this.setState((prevState) => {
      if (subdomainState !== subdomainNew && subdomainNew !== '') return { subdomain: subdomainNew }
      if (subdomainNew === '') return { subdomain: defaultSubdomain }
      return prevState
    })
  }

  render() {
    const { subdomain } = this.state

    return (
      <BasePageDivided>
        <Wrapper>
          <Header>
            <Header.Logo>
              <Icon icon="logo" height={49} />
              <Subtitle>
                <b>{subdomain}</b>
                  .avocado.pt
              </Subtitle>
            </Header.Logo>
            <Header.Title>
                Create workspace
            </Header.Title>
            <P>
              A private database and a unique sob-domain will be created to keep your data secure and independent.
            </P>
          </Header>
          <Form>
            <TenantCreateForm handleSubdomainChange={this.handleSubdomainChange} />
          </Form>
        </Wrapper>
      </BasePageDivided>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin-top: 0;
  padding: ${props => props.theme.spacing.base};
  ${above.md`
    padding: ${props => props.theme.spacing.l} ${props => props.theme.spacing.base};
  `}
`

const Header = styled.div`
  width: 100%;
`

Header.Logo = styled.div`
  display: flex;
  padding-bottom: ${props => props.theme.spacing.m};
  align-items: center;

  ${Subtitle}{
    padding-bottom: 0;
    padding-left: ${props => props.theme.spacing.base};
  }
`

Header.Title = styled(Title)`
  padding-top: 0;
`

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
