/* eslint-disable react/style-prop-object */
import React from 'react'
import PropTypes from 'prop-types';
import { theme } from 'utilities'

const getWidth = (originalWidth, originalHeight, currentHeight) => Math.round(currentHeight * originalHeight / originalWidth)

export const Icon = ({ icon, color, height }) => {
  switch (icon) {
    case 'star':
      return (
        <svg width={getWidth(20, 19, height)} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd"><path d="M-2-2h24v24H-2z" /><path fill={color} fillRule="nonzero" d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
            <path d="M-2-2h24v24H-2z" />
          </g>
        </svg>
      )
    case 'star-border':
      return (
        <svg width={getWidth(20, 19, height)} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M20 7.24l-7.19-.62L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27 16.18 19l-1.63-7.03L20 7.24zM10 13.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L10 4.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L10 13.4z" fill={color} fillRule="nonzero" /><path d="M-2-2h24v24H-2z" /></g></svg>
      )
    default:
      console.error('Invalid Icon prop')
      return 'Invalid Icon'
  }
}

Icon.propTypes = {
  icon: PropTypes.oneOf(['star', 'star-border']).isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
}

Icon.defaultProps = {
  color: theme.color.base,
  height: 24,
}
