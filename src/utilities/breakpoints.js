import { css } from 'styled-components'

export const size = {
  sm: 400,
  md: 1090,
  lg: 1140,
}

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})
