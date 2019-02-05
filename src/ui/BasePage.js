import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  BasePageTheMain as TheMain,
} from 'ui'

const BasePage = ({
  children,
  page,
  sideHeader,
  wrapContainer,
  className,
}) => (
  <div className={className}>
    <TheMain
      page={page}
      sideHeader={sideHeader}
      wrapContainer={wrapContainer}
    >
      {children}
    </TheMain>
  </div>
)

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
  wrapContainer: PropTypes.bool,
}

BasePage.defaultProps = {
  page: {
    title: 'Titulo',
  },
  wrapContainer: true,
  sideHeader: null,
}

export default styled(BasePage)`
  display: flex;
  flex-direction: column;

  .container {
    position: relative;
    z-index: ${props => props.theme.zIndex.m};
  }
`
