import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Title,
  P,
  Subtitle,
} from 'elements'
import {
  BasePageMain,
} from 'ui'
import { above } from 'utilities'
import illustrationAvocadoBubbles from 'assets/avocadoAndBubbles.svg'
import illustrationBubbleBig from 'assets/bubbleBig.svg'
import TenantCreateForm from './TenantCreateForm'

const defaultSubdomain = 'your-company'

export default class PageTenantCreate extends Component {
  state = {
    subdomain: defaultSubdomain,
    formLoading: false,
    formFailure: false,
    formSuccess: false,
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

  handleLoading = () => {
    this.setState(() => ({ formLoading: true, formSuccess: false, formFailure: false }))
  }

  handleSuccess = (data) => {
    this.setState(() => ({ formLoading: false, formSuccess: true, formFailure: false }))
  }

  handleFailure = () => {
    this.setState(() => ({ formLoading: false, formSuccess: false, formFailure: true }))
  }

  renderHeader = () => {
    const {
      formLoading, formSuccess, formFailure, subdomain,
    } = this.state

    const title = () => {
      if (formLoading) return 'Creating workspace'
      if (formSuccess) return 'Workspace created!'
      if (formFailure) return 'Oh no! Something went wrong'
      return 'Create a workspace'
    }

    const paragraph = () => {
      if (formLoading) return 'Hang on we are hard at work setting up your workspace! '
      if (formSuccess) return 'Go to your workspace and login with the account you just created'
      if (formFailure) return 'We\'re sorry but something went wrong, refresh and try again, if it doesn\'t work please contact us!'
      return 'A private database and a unique sob-domain will be created to keep your data secure and independent.'
    }

    return (
      <Header>
        <Header.Title>
          {title()}
        </Header.Title>
        <Subtitle>
          <b>{subdomain}</b>
          .avocado.pt
        </Subtitle>
        <P>
          {paragraph()}
        </P>
      </Header>
    )
  }

  render() {
    return (
      <BasePageMain>
        <Wrapper>
          {this.renderHeader()}
          <Form>
            <TenantCreateForm
              handleLoading={this.handleLoading}
              handleSuccess={(data) => this.handleSuccess(data)}
              handleFailure={this.handleFailure}
              handleSubdomainChange={this.handleSubdomainChange}
            />
          </Form>
        </Wrapper>
        <IllustrationWrapper>
          <IllustrationWrapper.Inner>
            <img className="create-illustration__left" src={illustrationBubbleBig} alt="big bubble illustration" />
            <img className="create-illustration__right" src={illustrationAvocadoBubbles} alt="avocado and bubbles illustration" />
          </IllustrationWrapper.Inner>
        </IllustrationWrapper>
      </BasePageMain>
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
    padding: 0;
    margin-left: auto;
    margin-right: auto;
  `}
  position: relative;
  z-index: ${props => props.theme.zIndex.m};
`

const Header = styled.div`
  width: 100%;
  padding-bottom: ${props => props.theme.spacing.ms};
  ${P} {
    padding-bottom: 0;
  }
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

const IllustrationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndex.s};
`

IllustrationWrapper.Inner = styled.div`
  max-width: 765px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.xxl};
  img.create-illustration__right {
    transform: translate(0, 200px);
    ${above.md`
      transform: translate(0, 100px);
  `}
  }
  img.create-illustration__left {
  }
`
