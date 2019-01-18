import React from 'react'
import {
  Emoji,
  Title,
} from 'elements'
import BaseTabs from 'ui/BaseTabs'
import styled from 'styled-components'
import { above } from 'utilities'

const Tabs = ({ className }) => (
  <BaseTabs className={className}>
    <BaseTabs.Tab to="/">
      Type
    </BaseTabs.Tab>
    <BaseTabs.Tab to="/elements">
      Elements
    </BaseTabs.Tab>
    <BaseTabs.Tab to="/components">
      Components
    </BaseTabs.Tab>
  </BaseTabs>
)

const BasePage = ({ children, className }) => (
  <div className={className}>
    <Header>
      <Title modifiers="inverse">
        <Emoji label="avocado" emoji="🥑" />
        {' '}
        Design System
      </Title>
      <Tabs />
    </Header>
    <Main>
      <div className="container">
        {children}
      </div>
    </Main>
    <Footer>
      Footer
    </Footer>
  </div>
)

const Header = styled.header`
    ${props => props.theme.gradient.bg()};
    padding: ${props => props.theme.spacing.base};
    padding-bottom: 0;
    ${above.md`
        padding: ${props => `${props.theme.spacing.m} ${props.theme.spacing.xl}`};
        padding-bottom: 0;
    `}
`

const Main = styled.main`
    display: block;
    position: relative;
    background-color: ${props => props.theme.color.bg};
    padding: ${props => props.theme.spacing.base};
    ${above.md`
      padding: ${props => `${props.theme.spacing.m}  ${props.theme.spacing.xl}`};
    `}
    &:before {
      ${props => props.theme.gradient.bg()};
      content: " ";
      display: block;
      height: 80px;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: ${props => props.theme.zIndex.s};
    }
`

const Footer = styled.footer`
  background-color: ${props => props.theme.color.bgPrimary};
  color: ${props => props.theme.color.baseInverse};
  padding: ${props => props.theme.spacing.base};
  margin-top: auto;
  ${above.md`
      padding: ${props => `${props.theme.spacing.m} ${props.theme.spacing.xl}`};
  `}
`

export default styled(BasePage)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .container {
    position: relative;
    z-index: ${props => props.theme.zIndex.m};
  }
`
