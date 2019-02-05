import React from 'react'
import PropTypes from 'prop-types'
import { TagIcon } from 'elements'
import { withTheme } from 'styled-components'

const computeColorFromPercent = ({ percent, theme }) => {
  if (percent <= 20) return theme.color.success
  if (percent > 20 && percent < 60) return theme.color.warning
  return theme.color.danger
}

const CardUnitRiskFactor = ({ percent, theme }) => {
  const color = computeColorFromPercent({ percent, theme })
  return (
    <TagIcon icon="risk" name="Risk factor" value={`${percent}%`} color={color} />
  )
}

export default withTheme(CardUnitRiskFactor)

CardUnitRiskFactor.propTypes = {
  percent: PropTypes.number.isRequired,
  theme: PropTypes.shape({}).isRequired,
}

CardUnitRiskFactor.defaultProps = {
}
