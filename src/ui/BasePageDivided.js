import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { above } from 'utilities'
import illustrationDefault from 'assets/tenantCreation.svg'

const BasePageDivided = ({ children, className, illustration }) => (
  <div className={className}>
    <Main>
      {children}
    </Main>
    <Secondary>
      <img src={illustration} alt="illustration organization creation" />
    </Secondary>
  </div>
)

BasePageDivided.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  illustration: PropTypes.string,
}

BasePageDivided.defaultProps = {
  illustration: illustrationDefault,
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.color.bgLighter};
  ${above.md`
    width: 50%;
    box-shadow: 2px 0 3px 0 rgba(10,10,10,0.10);
  `}
`

const Secondary = styled.div`
  width: 0%;
  height: 0%;
  display: none;
  background-color: ${props => props.theme.color.bg};
  ${above.md`
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    padding: ${props => props.theme.spacing.base};
  `}
`

export default styled(BasePageDivided)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`
