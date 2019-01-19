import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from 'elements'
import { theme } from 'utilities'

function BaseRateStar({
  isActive,
  className,
  onMouseEnter,
  onClick,
}) {
  return (
    <div className={className} role="button" tabIndex={0} onKeyPress={onClick} onClick={onClick} onMouseEnter={onMouseEnter}>
      {
        isActive
          ? <Icon icon="star" color={theme.color.star} />
          : <Icon icon="star-border" color={theme.color.star} />
      }
    </div>
  )
}

BaseRateStar.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

BaseRateStar.defaultProps = {
  isActive: false,
}

export default styled(BaseRateStar)`
  cursor: pointer;
  padding: ${props => props.theme.spacing.xxxs};
  transform: scale(1);
  transition: all 250ms;
  &:hover{
    transform: scale(1.2);
  }
`
