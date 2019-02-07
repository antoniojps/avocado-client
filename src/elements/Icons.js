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
  case 'resources':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 354.796 354.796">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M265.442 109.092c-10.602-4.25-13.665-6.82-13.665-11.461 0-3.714 2.813-8.053 10.744-8.053 7.015 0 12.395 2.766 12.443 2.79a3.911 3.911 0 0 0 1.83.463 3.695 3.695 0 0 0 3.456-2.367l1.927-4.926c.671-1.795-.347-3.359-1.645-3.92-4.319-1.88-12.76-3.335-12.846-3.35-.136-.024-.609-.125-.609-.678l-.027-7.146c0-2.152-1.797-3.904-4.003-3.904h-3.457c-2.204 0-4 1.751-4 3.905l.009 7.513c0 .576-.624.826-.852.879-10.655 2.538-17.314 10.343-17.314 20.188 0 12.273 10.145 17.819 21.099 21.982 8.757 3.438 12.329 6.924 12.329 12.037 0 5.564-5.059 9.45-12.307 9.45-6.189 0-14.565-3.923-14.648-3.963a3.913 3.913 0 0 0-1.688-.382 3.74 3.74 0 0 0-3.537 2.457l-1.84 4.982c-.654 1.86.353 3.37 1.642 4.042 5.144 2.679 15.098 4.249 15.541 4.318.119.017.725.23.725.784v7.48c0 2.152 1.797 3.904 4.004 3.904h3.572c2.208 0 4.005-1.751 4.005-3.904v-7.872c0-.736.543-.801.655-.828 11.351-2.55 18.343-10.855 18.343-21.283-.003-10.711-5.951-17.632-19.886-23.137z" />
          <path d="M260.979 22.509c-51.816 0-93.818 42.005-93.818 93.818 0 51.814 42.002 93.82 93.818 93.82 51.814 0 93.817-42.006 93.817-93.82 0-51.813-42.003-93.818-93.817-93.818zm0 165.895c-39.808 0-72.076-32.271-72.076-72.076s32.268-72.075 72.076-72.075c39.806 0 72.073 32.27 72.073 72.075s-32.267 72.076-72.073 72.076zM335.733 255.61c-19.95 11.011-47.389 21.192-74.753 25.484-24.346 3.818-70.148-5.39-70.148-16.265 0-4.121 40.17 10.154 64.469 3.671 18.633-4.971 15.988-22.401 5.853-24.7-10.076-2.287-69.108-23.913-94.323-24.659-11.878-.351-41.203 4.131-55.393 6.442-4.861.791-7.909.704-8.213 5.356-1.412 21.62-4.195 65.832-5.712 88.926-.032.488.646 7.05 6.061 2.432 5.927-5.054 14.24-10.656 21.929-8.912 12.063 2.737 116.424 21.856 130.819 18.51 20.593-4.787 78.888-39.334 90.065-50.072 17.324-16.647 3.857-34.222-10.654-26.213zM74.426 224.74l-54.672-2.694c-4.221-.208-8.532 2.973-9.581 7.066L.232 319.367c-1.048 4.094 1.55 7.578 5.773 7.741l60.59-.006c4.224.163 7.942-3.151 8.266-7.365l6.654-86.958a7.458 7.458 0 0 0-7.089-8.039zM42.24 315.145c-8.349 0-15.116-6.768-15.116-15.116 0-8.349 6.768-15.116 15.116-15.116s15.116 6.768 15.116 15.116c0 8.349-6.767 15.116-15.116 15.116z" />
        </g>
      </svg>
    )
  case 'avatar':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
          <path fill="none" d="M0 0h24v24H0z" />
        </g>

      </svg>
    )
  case 'arrow-down':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M7 10l5 5 5-5z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </g>
      </svg>
    )

  case 'logout':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} viewBox="0 0 24 24">
        <g fill={iconColor} fillRule="evenodd">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
        </g>
      </svg>
    )
    case 'user':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={getWidth(24, 24, height)} height={height} fill={iconColor} viewBox="0 0 24 24">
          <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
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
    'resources',
    'avatar',
    'arrow-down',
    'logout',
    'user',
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
