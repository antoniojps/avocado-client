import { css } from 'styled-components'

const size = {
  sm: 400,
  md: 960,
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
