import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getMainUrl } from 'utilities'
import { BaseLoader } from 'ui'
import { CenterDiv } from 'elements'
import { withRouter } from 'react-router-dom'
import withAuth from 'user/withAuth'
import withTenant from 'tenant/withTenant'

class PageGather extends Component {
  componentDidMount() {
    const { getTenant } = this.props
    getTenant()
  }

  componentDidUpdate() {
    this.handleTenantVerifications()
  }

  handleTenantVerifications = () => {
    const {
      tenant, tenantFailure, tenantLoading,
      history,
      gatherRedirect,
    } = this.props

    // fail
    if (!tenantLoading && tenantFailure) this.goToMainWebsite()
    // success
    if (!tenantLoading && tenant) history.push(gatherRedirect)
  }

  goToMainWebsite = () => {
    const mainUrl = getMainUrl()
    window.location.replace(mainUrl);
  }

  render() {
    return (
      <GatherWrapper>
        <CenterDiv>
          <BaseLoader message="Loading..." />
        </CenterDiv>
      </GatherWrapper>
    )
  }
}

const GatherWrapper = styled.div`
  position: absolute;
  top: 0;
  left:0;
  width:100%;
  height:100%;
  background-color: ${props => props.theme.color.bgLighter}};
  text-align:center;
`

PageGather.propTypes = {
  getTenant: PropTypes.func.isRequired,
  tenant: PropTypes.shape({}),
  tenantFailure: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({}),
  ]).isRequired,
  tenantLoading: PropTypes.bool.isRequired,
  gatherRedirect: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
}

PageGather.defaultProps = {
  tenant: null,
}

export default withRouter(withAuth(withTenant(PageGather)))
