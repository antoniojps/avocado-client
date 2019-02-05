/* eslint-disable react/style-prop-object */
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

const getWidth = (originalWidth, originalHeight, currentHeight) => Math.round(currentHeight * (originalWidth / originalHeight))

const BaseIcon = ({
  icon,
  color,
  height,
  theme,
  modifiers,
}) => {
  const isInverseModifierActive = (typeof modifiers === 'string' ? modifiers === 'inverse' : modifiers.includes('inverse'))
  const iconColor = color || (isInverseModifierActive ? theme.color.baseInverse : theme.color.base)

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
  case 'logo-text':
    return (
      <svg width={getWidth(188, 49, height)} height={height} viewBox="0 0 188 49" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient x1="50%" y1="1.804%" x2="50%" y2="100%" id="a">
            <stop stopColor="#CEF2E1" offset="0%" />
            <stop stopColor="#F1FCE8" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd">
          <path d="M55.12 35.92h2.78c.58 0 .84-.38.93-.61l1.51-3.9h9.5l1.5 3.9c.07.23.32.61.93.61h2.79c.35 0 .64-.29.64-.67 0-.07 0-.19-.04-.29l-7.71-20.64c-.16-.45-.48-.8-1.12-.8h-3.49c-.64 0-.99.35-1.12.8l-7.71 20.64c-.03.1-.06.22-.06.29 0 .38.32.67.67.67zm6.34-8.19l3.61-9.89 3.65 9.89h-7.26zm22.72 8.19h2.36c.68 0 .96-.35 1.16-.8l6.01-14.85c.03-.09.03-.22.03-.29 0-.38-.32-.7-.67-.7h-2.62c-.48 0-.74.35-.83.61l-4.26 11.23-4.26-11.23c-.09-.26-.32-.61-.83-.61h-2.59c-.38 0-.7.32-.7.7 0 .07.03.2.06.29l5.98 14.85c.2.45.48.8 1.16.8zm19.84.32c5.12 0 7.77-2.88 8-7.23.03-.77.03-2.05 0-2.82-.23-4.35-3.01-7.23-8-7.23-5 0-7.78 2.88-8 7.23-.04.77-.04 2.05 0 2.82.22 4.35 2.88 7.23 8 7.23zm0-3.17c-2.28 0-3.52-1.44-3.65-4.22-.03-.64-.03-1.86 0-2.5.13-2.75 1.37-4.22 3.65-4.22 2.27 0 3.52 1.47 3.64 4.22.04.64.04 1.86 0 2.5-.12 2.78-1.37 4.22-3.64 4.22zm18.78 3.17c5.57 0 7.65-3.62 7.74-5.54.04-.44-.35-.76-.76-.76h-2.82c-.45 0-.64.19-.83.64-.64 1.69-1.63 2.33-3.27 2.33-2.14 0-3.45-1.25-3.55-4.19-.03-.61-.03-1.47 0-2.24.1-2.88 1.41-4.19 3.55-4.19 1.6 0 2.63.64 3.27 2.33.19.45.38.64.83.64h2.82c.41 0 .8-.32.76-.76-.09-2.05-2.33-5.54-7.74-5.54-4.67 0-7.68 2.72-7.84 7.36-.03.67-.03 1.92 0 2.56.19 4.64 3.17 7.36 7.84 7.36zm15.9 0c2.76 0 4.39-1.15 5.22-2.34v1.25c0 .45.32.77.77.77h2.59c.45 0 .77-.32.77-.77V25.1c0-3.32-1.89-6.14-7.23-6.14-4.96 0-6.88 2.94-6.95 4.32 0 .42.32.7.71.7h2.46c.22 0 .38-.09.48-.38.64-.64 1.44-1.73 3.26-1.73 2.18 0 2.98 1.03 2.98 2.82v.67l-4.38.64c-3.94.61-6.6 2.37-6.6 5.34 0 2.76 2.6 4.9 5.92 4.9zm1.09-3.04c-1.5 0-2.94-.74-2.94-2.18 0-1.21 1.21-2.11 3.74-2.49l3.2-.51v.67c0 3.07-1.76 4.51-4 4.51zm18.53 3.04c2.46 0 4.06-.96 5.12-2.27v1.18c0 .45.32.77.77.77h2.53c.44 0 .76-.32.76-.77V13.97c0-.45-.32-.77-.76-.77h-2.72a.74.74 0 0 0-.77.77v7.1c-1.06-1.21-2.63-2.11-4.93-2.11-4.48 0-6.69 3.33-6.82 7.58-.03.77-.03 1.32 0 2.08.16 4.42 2.34 7.62 6.82 7.62zm1.18-3.42c-2.68 0-3.55-1.96-3.68-4.26-.03-.64-.03-1.28 0-1.92.13-2.3 1-4.26 3.68-4.26 2.56 0 3.68 1.96 3.75 3.88.03.76.03 1.69 0 2.46-.1 2.02-1.09 4.1-3.75 4.1zm19.62 3.42c5.12 0 7.78-2.88 8-7.23.03-.77.03-2.05 0-2.82-.22-4.35-3.01-7.23-8-7.23s-7.78 2.88-8 7.23c-.03.77-.03 2.05 0 2.82.22 4.35 2.88 7.23 8 7.23zm0-3.17c-2.27 0-3.52-1.44-3.65-4.22-.03-.64-.03-1.86 0-2.5.13-2.75 1.38-4.22 3.65-4.22s3.52 1.47 3.65 4.22c.03.64.03 1.86 0 2.5-.13 2.78-1.38 4.22-3.65 4.22z" fill="#363636" fillRule="nonzero" />
          <path d="M15 47.5c7.463 0 13.5-5.906 13.5-13.175 0-4.17-1.804-12.722-4.305-19.695C21.27 6.475 17.815 1.5 15 1.5c-2.694 0-5.997 4.572-8.858 12.21C3.472 20.84 1.5 29.94 1.5 34.325 1.5 41.594 7.537 47.5 15 47.5z" stroke="#40CB89" strokeWidth="3" fill="url(#a)" />
        </g>
      </svg>
    )
  case 'star':
    return (
      <svg width={getWidth(20, 19, height)} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path d="M-2-2h24v24H-2z" />
          <path fill={iconColor} fillRule="nonzero" d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
          <path d="M-2-2h24v24H-2z" />
        </g>
      </svg>
    )
  case 'star-border':
    return (
      <svg width={getWidth(20, 19, height)} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path d="M20 7.24l-7.19-.62L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27 16.18 19l-1.63-7.03L20 7.24zM10 13.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L10 4.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L10 13.4z" fill={iconColor} fillRule="nonzero" />
          <path d="M-2-2h24v24H-2z" />
        </g>
      </svg>
    )
  case 'chevron-right':
    return (
      <svg width={getWidth(8, 12, height)} height={height} viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <path fill={iconColor} fillRule="nonzero" d="M2 0L.59 1.41 5.17 6 .59 10.59 2 12l6-6z" />
          <path d="M-8-6h24v24H-8z" />
        </g>

      </svg>
    )
  case 'edit':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </g>
      </svg>
    )
  case 'close':
    return (
      <svg width={getWidth(24, 22, height)} height={height} viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.764 9.05L20.792.92A1.5 1.5 0 1 1 22.8 3.15l-8.795 7.919 8.795 7.918a1.5 1.5 0 1 1-2.008 2.23l-9.028-8.13-9.029 8.13a1.5 1.5 0 0 1-2.007-2.23l8.794-7.918L.728 3.15A1.5 1.5 0 1 1 2.735.92l9.029 8.13z" fill={iconColor} fillRule="evenodd" />
      </svg>
    )
  case 'unit':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
        </g>
      </svg>
    )
  case 'expandMore':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </g>
      </svg>
    )
  case 'expandLess':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </g>
      </svg>
    )
  case 'risk':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
        </g>
      </svg>
    )
  default:
    console.error('Invalid Icon prop')
    return 'Invalid Icon'
  }
}

BaseIcon.propTypes = {
  icon: PropTypes.oneOf([
    'logo', 'logo-text',
    'star', 'star-border',
    'chevron-right',
    'edit',
    'close',
    'unit',
    'expandLess', 'expandMore',
    'risk',
  ]).isRequired,
  color: PropTypes.string,
  height: PropTypes.number,
  modifiers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
}

BaseIcon.defaultProps = {
  color: null,
  height: 24,
  modifiers: [],
}

export const Icon = withTheme(BaseIcon)
