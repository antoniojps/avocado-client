import { rem } from 'polished'
import { css } from 'styled-components'

const color = {
  base: '#363636',
  baseLighter: '#7A7A7A',
  primary: '#40CB89',
  primaryDarker: '#2AB875',
  border: '#E6E6E6',
  bg: '#F5F5F5',
  bgLighter: '#FFFFFF',
  bgDark: '#242424',
  danger: '#FB6D77',
  warning: '#F5874A',
  success: '#FB6D77',
}

const gradients = {
  bg: () => css`
    background-image: linear-gradient(-135deg, #408263 0%, #42705C 100%);
  `,
}

const values = {
  borderRadius: '4px',
}

const size = {
  base: rem('16px'),
  xxxs: rem('12px'),
  xxs: rem('14px'),
  xs: rem('16px'),
  ls: rem('18px'),
  s: rem('20px'),
  m: rem('32px'),
  l: rem('48px'),
  xl: rem('60px'),
}

const spacing = {
  base: rem('16px'),
  xxxs: rem('4px'),
  xxs: rem('8px'),
  xs: rem('12px'),
  s: rem('20px'),
  sm: rem('22px'),
  ms: rem('24px'),
  m: rem('30px'),
  l: rem('48px'),
  xl: rem('60px'),
  xxl: rem('108px'),
}

const zIndex = {
  s: 0,
  m: 10,
  l: 20,
}


export const theme = {
  color,
  gradients,
  spacing,
  size,
  values,
  zIndex,
}
