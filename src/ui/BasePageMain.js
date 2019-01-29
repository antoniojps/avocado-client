import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon, Button } from 'elements'
import { BaseBreakpoints } from 'ui'
import { withRouter } from 'react-router-dom'

const BasePage = withRouter(({ children, className, history: { push } }) => (
  <div className={className}>
    <Header>
      <Header.Nav>
        <Icon icon="logo-text" height={48} />
        <div>
          <Button modifiers={['primary', 'noMargin', 'important']} onClick={() => push('/create')}>
            <BaseBreakpoints render={({ md }) => (md ? 'Try for free' : 'Try')} />
          </Button>
        </div>
      </Header.Nav>
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
))

BasePage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
}

BasePage.defaultProps = {
}

const Header = styled.header`
  padding: ${props => props.theme.spacing.m} ${props => props.theme.spacing.base} ${props => props.theme.spacing.xxms} ${props => props.theme.spacing.base};
`

const Row = styled.section`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

Header.Nav = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Main = styled.main`
    display: block;
    position: relative;
    padding: ${props => props.theme.spacing.base};
    padding-top: 0;
    background-color: ${props => props.theme.color.bgLighter};
`

const Footer = styled.footer`
  color: ${props => props.theme.color.baseInverse};
  padding: ${props => props.theme.spacing.base};
  background-color: ${props => props.theme.color.bgLight};
  margin-top: auto;
`

export default styled(BasePage)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.color.bgLighter};

  .container {
    position: relative;
    z-index: ${props => props.theme.zIndex.m};
  }
`
