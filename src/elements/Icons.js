/* eslint-disable react/style-prop-object */
import React from 'react'
import PropTypes from 'prop-types';
import { theme } from 'utilities'

const getWidth = (originalWidth, originalHeight, currentHeight) => Math.round(currentHeight * (originalWidth / originalHeight))

export const Icon = ({ icon, color, height }) => {
  switch (icon) {
    case 'logo':
      return (
        <svg width={getWidth(15, 24, height)} height={height} viewBox="0 0 15 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="1.804%" x2="50%" y2="100%" id="a">
              <stop stopColor="#3CC888" offset="0%" />
              <stop stopColor="#BDF188" offset="100%" />
            </linearGradient>
          </defs>
          <path d="M7.5 23.265c3.743 0 6.765-2.896 6.765-6.453 0-5.42-3.902-16.077-6.765-16.077-1.362 0-3.013 2.239-4.445 5.985C1.72 10.21.735 14.667.735 16.812c0 3.557 3.022 6.453 6.765 6.453z" fill="url(#a)" stroke="#40CB89" strokeWidth="1.469" fillRule="evenodd" />
        </svg>
      )
    case 'star':
      return (
        <svg width={getWidth(20, 19, height)} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path d="M-2-2h24v24H-2z" />
            <path fill={color} fillRule="nonzero" d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
            <path d="M-2-2h24v24H-2z" />
          </g>
        </svg>
      )
    case 'star-border':
      return (
        <svg width={getWidth(20, 19, height)} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path d="M20 7.24l-7.19-.62L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27 16.18 19l-1.63-7.03L20 7.24zM10 13.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L10 4.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L10 13.4z" fill={color} fillRule="nonzero" />
            <path d="M-2-2h24v24H-2z" />
          </g>
        </svg>
      )
    default:
      console.error('Invalid Icon prop')
      return 'Invalid Icon'
  }
}

Icon.propTypes = {
  icon: PropTypes.oneOf(['logo', 'star', 'star-border']).isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
}

Icon.defaultProps = {
  color: theme.color.base,
  height: 24,
}
