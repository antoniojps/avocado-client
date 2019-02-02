import React from 'react'
import styled from 'styled-components'
import { Row } from 'elements'
import { TheNavBar, BaseBreadcrumb } from 'ui'
import { above } from 'utilities'
import withTenant from 'tenant/withTenant'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const BasePageHeader = ({ tenant, location }) => {
  const breadcrumbBase = {
    title: (tenant && tenant.name) || 'Avocado',
    to: '/',
  }
  const removeFrom = ['/login', '/gather']
  const currentPath = location.pathname
  const shouldRender = !removeFrom.includes(currentPath)

  if (!shouldRender) return null;

  return (
    <Header>
      <Row>
        <TheNavBar>
          <BaseBreadcrumb modifiers="inverse" basePage={breadcrumbBase} />
        </TheNavBar>
      </Row>
    </Header>
  )
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

BasePageHeader.propTypes = {
  tenant: PropTypes.shape({
    name: PropTypes.string,
  }),
}

BasePageHeader.defaultProps = {
  tenant: {
    name: 'Avocado',
  },
}

export default withRouter(withTenant(BasePageHeader))
