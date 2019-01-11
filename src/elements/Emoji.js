import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Emoji = ({ label = 'emoji', emoji = '🥑', className }) => (
  <span className={className} role="img" aria-label={label}>
    {emoji}
  </span>
)

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default styled(Emoji)`
  display: inline-flex;
  font-size: 2rem;
  padding-right: 1rem;
`
