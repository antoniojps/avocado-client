import React from 'react'
import { TheNavBar, TheNavList } from 'ui'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { above } from 'utilities'

const BasePage = ({ children, title, className }) => (
  <div className={className}>
    <Header>
      <Row>
        <TheNavBar>
          {title}
        </TheNavBar>
        <Header.Seperator />
        <TheNavList list={[
          {
            name: 'Elements',
            to: '/',
          },
          {
            name: 'Components',
            to: '/components',
          },
        ]}
        />
      </Row>
    </Header>
    <Main>
      <Row>
        <div className="container">
          {children}
        </div>
      </Row>
    </Main>
    <Footer>
      <Row>
        Footer
      </Row>
    </Footer>
  </div>
)

BasePage.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

const Header = styled.header`
  ${props => props.theme.gradient.bg()};
  padding: ${props => props.theme.spacing.m} ${props => props.theme.spacing.base} ${props => props.theme.spacing.xxms} ${props => props.theme.spacing.base};
`

Header.Seperator = styled.div`
  height: 2px;
  width: 100%;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.32) 15%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.36) 85%, rgba(255,255,255,0.00) 100%);`

const Main = styled.main`
    display: block;
    position: relative;
    background-color: ${props => props.theme.color.bg};
    padding: ${props => props.theme.spacing.base};
    padding-top: 0;
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
      padding: 0;
  `}
`
const Row = styled.section`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
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
