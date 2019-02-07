import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getMainUrl, getToken } from 'utilities'
import { BaseLoader } from 'ui'
import { CenterDiv } from 'elements'
import { withRouter } from 'react-router-dom'
import withAuth from 'user/withAuth'
import withTenant from 'tenant/withTenant'
import { isEqual } from 'lodash'

class PageGather extends Component {
  componentDidMount = () => {
    const { getTenant } = this.props
    getTenant()
  }

  componentDidUpdate = (prevProps) => {
    const { tenantLoading, warmupLoading } = this.props
    const tenantUpdated = this.deepCompareTenant(prevProps)
    if (tenantUpdated && !tenantLoading) this.handleTenantVerification()

    const warmupUpdated = this.deepCompareWarmup(prevProps)
    if (warmupUpdated && !warmupLoading) this.handleWarmupVerifications()
  }

  deepCompareTenant = (prevProps) => {
    const { tenant: tenantPrev, tenantFailure: tenantFailurePrev, tenantLoading: tenantLoadingPrev } = prevProps
    const { tenant: tenantNext, tenantFailure: tenantFailureNext, tenantLoading: tenantLoadingNext } = this.props

    const prevTenant = { tenant: tenantPrev, tenantFailure: tenantFailurePrev, tenantLoading: tenantLoadingPrev }
    const nextTenant = { tenant: tenantNext, tenantFailure: tenantFailureNext, tenantLoading: tenantLoadingNext }
    const isDifferent = !isEqual(prevTenant, nextTenant)
    return isDifferent
  }

  deepCompareWarmup = (prevProps) => {
    const { warmup: warmupPrev, warmupFailure: warmupFailurePrev, warmupLoading: warmupLoadingPrev } = prevProps
    const { warmup: warmupNext, warmupFailure: warmupFailureNext, warmupLoading: warmupLoadingNext } = this.props

    const prevWarmup = { warmup: warmupPrev, warmupFailure: warmupFailurePrev, warmupLoading: warmupLoadingPrev }
    const nextWarmup = { warmup: warmupNext, warmupFailure: warmupFailureNext, warmupLoading: warmupLoadingNext }
    const isDifferent = !isEqual(prevWarmup, nextWarmup)
    return isDifferent
  }


  handleTenantVerification = () => {
    const {
      tenant, tenantFailure, tenantLoading,
    } = this.props
    const tenantFail = !tenantLoading && tenantFailure
    const tenantSuccess = !tenantLoading && tenant
    if (tenantFail) this.goToMainWebsite()
    if (tenantSuccess) this.handleAuthVerification()
  }

  handleAuthVerification = () => {
    const { history } = this.props
    const token = getToken()

    if (!token) {
      history.push('/login')
    } else this.handleWarmupRequest()
  }

  // validates token and fetches current user data
  handleWarmupRequest = () => {
    const { fetchWarmup } = this.props
    fetchWarmup()
  }

  computeWhiteListedRedirect = () => {
    const { gatherRedirect } = this.props
    const whiteList = ['register']
    const page = gatherRedirect.split('/')[1]
    const isWhiteListed = whiteList.includes(page)
    return (isWhiteListed)
  }

  handleWarmupVerifications = () => {
    const {
      warmup, warmupFailure, warmupLoading, history, gatherRedirect,
    } = this.props

    const isWhiteListed = this.computeWhiteListedRedirect()

    if (warmupLoading) return;
    if (warmupFailure) {
      if (isWhiteListed) history.push(gatherRedirect);
      else history.push('/login')
    }
    if (warmup) this.handleSuccess()
  }

  handleSuccess = () => {
    const { gatherRedirect, history } = this.props
    const isWhiteListed = this.computeWhiteListedRedirect()
    if (gatherRedirect === '/gather/register' || isWhiteListed) return history.push('/')
    history.push(gatherRedirect)
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
  fetchWarmup: PropTypes.func.isRequired,
  warmup: PropTypes.shape({}),
  warmupLoading: PropTypes.bool.isRequired,
  warmupFailure: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({}),
  ]).isRequired,
  gatherRedirect: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
}

PageGather.defaultProps = {
  tenant: null,
  warmup: null,
}

export default withRouter(withAuth(withTenant(PageGather)))
