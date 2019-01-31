import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import withTenant from 'tenant/withTenant'
import { withRouter } from 'react-router-dom'
import { Container, Title, P } from 'elements'
import { above } from 'utilities'
import { routes } from 'tenant/Routes'
import {
  TheNavBar,
  BaseBreadcrumb,
  BaseTabs,
  BaseBreakpoints,
} from 'ui'

const getTabsFromPath = (path) => {
  if (path === '/') return null
  const pathParent = path.split('/').slice(1)[0]
  const pathRoutes = routes[pathParent]
  const tabs = []
  Object.keys(pathRoutes).forEach(keyRoute => {
    const route = pathRoutes[keyRoute]
    if (typeof route === 'object') {
      tabs.push({
        name: route.name,
        to: route.path,
        key: route.key,
      })
    }
  })
  if (tabs.length === 0) return null
  return tabs
}

const renderBaseTabs = ({ history }) => {
  const { location: { pathname } } = history
  const tabs = getTabsFromPath(pathname)
  if (!tabs) return null
  return (
    <BaseTabs orientation="vertical">
      {tabs.map(({ name, to, key }) => (
        <BaseTabs.Tab to={to} key={key}>
          {name}
        </BaseTabs.Tab>
      ))}
    </BaseTabs>
  )
}

const renderMainContent = ({ children, page }) => {
  const { subtitle, description } = page
  return (
    <Main.Content>
      {subtitle
        && (
          <Main.Subtitle modifiers="small">
            {subtitle}
          </Main.Subtitle>
        )}
      {description
        && (
          <Main.Description>
            {description}
          </Main.Description>
        )}
      <BaseBreakpoints render={({ md }) => (md
        ? (
          <Container>
            {children}
          </Container>
        )
        : children
      )}
      />
    </Main.Content>
  )
}

const BasePage = ({
  children,
  page,
  sideHeader,
  className,
  history,
  tenant,
}) => {
  const hasTabs = getTabsFromPath(history.location.pathname)
  const { title } = page
  const breadcrumbBase = {
    title: (tenant && tenant.name) || 'Avocado',
    to: '/',
  }
  return (
    <div className={className}>
      <Header>
        <Row>
          <TheNavBar>
            <BaseBreadcrumb modifiers="inverse" basePage={breadcrumbBase} />
          </TheNavBar>
        </Row>
      </Header>
      <Main>
        <Row>
          <div className="container">
            <Container>
              <Main.Header>
                <Main.HeaderTitle>
                  <Title modifiers={['noMargin', 'big']}>
                    {title}
                  </Title>
                </Main.HeaderTitle>
                {sideHeader
                  && (
                    <Main.HeaderSide>
                      {sideHeader}
                    </Main.HeaderSide>
                  )
                }
              </Main.Header>
              <BaseBreakpoints render={({ md }) => !md
              && renderMainContent({ children, page })
              }
              />
            </Container>
            <Main.Wrapper>
              {hasTabs
                && (
                  <Main.NavSecondaryDesktop>
                    {renderBaseTabs({ history })}
                  </Main.NavSecondaryDesktop>
                )
              }
              <BaseBreakpoints render={({ md }) => md
              && renderMainContent(
                { children, page }
              )
              }
              />
            </Main.Wrapper>
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
}

BasePage.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string,
  }),
  sideHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  className: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  tenant: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

BasePage.defaultProps = {
  page: {
    title: 'Titulo',
  },
  sideHeader: null,
}

const Header = styled.header`
  ${props => props.theme.gradient.bg()};
  padding: ${props => props.theme.spacing.base} ${props => props.theme.spacing.base} ${props => props.theme.spacing.xxms} ${props => props.theme.spacing.base};
  padding-left: 0;
  padding-top: 0;
  ${above.md`
    padding: ${props => props.theme.spacing.m} ${props => props.theme.spacing.base} ${props => props.theme.spacing.xxms} ${props => props.theme.spacing.base};
  `}
`

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
      height: 40px;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: ${props => props.theme.zIndex.s};
    }
`

Main.Header = styled.div`
  display: flex;
  justify-content: initial;
  align-items: center;
  flex-direction: column;
  align-items: initial;
  ${above.md`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`

Main.HeaderTitle = styled.div`
  padding-bottom: ${props => props.theme.spacing.base};
  ${above.md`
    padding-bottom: 0;
  `}
`

Main.HeaderSide = styled.div`
`

Main.Wrapper = styled.div`
  display: flex;
  width: 100%;
`

Main.NavSecondaryDesktop = styled.div`
  display: none;
  width: 260px;
  margin-right: ${props => props.theme.spacing.ms};
  ${above.md`
    display: block;
  `}
`

Main.Content = styled.div`
  width: 100%;
`

Main.Subtitle = styled(Title)`
  font-size: ${props => props.theme.size.s};
  font-weight: 400;
  color: ${props => props.theme.color.baseLighter};

  ${above.md`
    padding-top: 0;
    font-size: ${props => props.theme.size.sm};
    font-weight: 600;
    color: ${props => props.theme.color.base};
  `}

`

Main.Description = styled(P)`
  ${above.md`
    padding-bottom: ${props => props.theme.spacing.ms};
  `}
`

const Footer = styled.footer`
  background-color: ${props => props.theme.color.bgPrimary};
  color: ${props => props.theme.color.baseInverse};
  padding: ${props => props.theme.spacing.base};
  margin-top: auto;
`
const Row = styled.section`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`

export default withRouter(withTenant(styled(BasePage)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .container {
    position: relative;
    z-index: ${props => props.theme.zIndex.m};
  }
`))
