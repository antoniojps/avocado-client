import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Title,
  P,
  Row,
} from 'elements'
import { above, hasPermissions } from 'utilities'
import {
  BaseTabs,
  BaseBreakpoints,
} from 'ui'
import { routes } from 'tenant/Routes'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const getTabsFromPath = (path) => {
  if (path === '/') return null
  const pathParent = path.split('/').slice(1)[0]
  const pathExists = Object.keys(routes).includes(pathParent)
  if (!pathExists) return null
  const pathRoutes = routes[pathParent]
  const tabs = []
  Object.keys(pathRoutes).forEach(keyRoute => {
    const route = pathRoutes[keyRoute]
    if (typeof route === 'object') {
      tabs.push({
        name: route.name,
        to: route.path,
        key: route.key,
        required: route.required || null,
      })
    }
  })
  if (tabs.length === 0) return null
  return tabs
}

const BaseTabsList = ({ history, permissions }) => {
  const { location: { pathname } } = history
  const tabs = getTabsFromPath(pathname)
  if (!tabs) return null
  return (
    <BaseTabs orientation="vertical">
      {tabs.map(({
        name, to, key, required,
      }) => {
        if (required) {
          return hasPermissions({ permissions, required })
            ? (
              <BaseTabs.Tab to={to} key={key}>
                {name}
              </BaseTabs.Tab>
            )
            : (
              <BaseTabs.Tab to="/just-sending-this-to-prevent-invalid-prop-to" key={key} isVisible={false} />
            )
        }
        return (
          <BaseTabs.Tab to={to} key={key}>
            {name}
          </BaseTabs.Tab>
        )
      }
      )}
    </BaseTabs>
  )
}

const mapStateToProps = state => {
  const { user: { warmup } } = state
  const permissions = (warmup && warmup.permissions) || null
  return {
    permissions,
  }
}

const TabsList = connect(mapStateToProps)(BaseTabsList)

const renderMainContent = ({ children, page, wrapContainer }) => {
  const { subtitle, description } = page
  const renderContainer = () => (wrapContainer === true ? (
    <Container>
      {children}
    </Container>
  ) : children);

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
          renderContainer()
        )
        : children
      )}
      />
    </Main.Content>
  )
}

const BasePageMain = ({
  children,
  page,
  sideHeader,
  wrapContainer,
  history,
}) => {
  const hasTabs = getTabsFromPath(history.location.pathname)
  const { title } = page
  return (
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
              && renderMainContent({ children, page, wrapContainer })
            }
            />
          </Container>
          <Main.Wrapper>
            {hasTabs
              && (
                <Main.NavSecondaryDesktop>
                  <TabsList history={history} />
                </Main.NavSecondaryDesktop>
              )
            }
            <BaseBreakpoints render={({ md }) => md
              && renderMainContent(
                { children, page, wrapContainer }
              )
            }
            />
          </Main.Wrapper>
        </div>
      </Row>
    </Main>
  )
}

BasePageMain.propTypes = {
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
  history: PropTypes.shape({}).isRequired,
  wrapContainer: PropTypes.bool,
}

BasePageMain.defaultProps = {
  page: {
    title: 'Titulo',
    wrapContainer: true,
  },
  sideHeader: null,
  wrapContainer: true,
}


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
  padding-bottom: ${props => props.theme.spacing.ms};
            `

export default withRouter(BasePageMain)
