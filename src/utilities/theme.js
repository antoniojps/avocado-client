import { rem } from 'polished'
import { css } from 'styled-components'

const color = {
  base: '#363636',
  baseInverse: '#FFFFFF',
  baseLighter: '#7A7A7A',
  primary: '#40CB89',
  primaryDarker: '#2AB875',
  border: '#E6E6E6',
  bg: '#F5F5F5',
  bgLighter: '#FFFFFF',
  bgDark: '#242424',
  danger: '#FB6D77',
  dangerDarker: '#EB4D5D',
  warning: '#F5874A',
  success: '#FB6D77',
}

const gradient = {
  bg: () => css`
    background-image: linear-gradient(-135deg, #408263 0%, #42705C 100%);
  `,
}

const value = {
  borderRadius: '8px',
  borderSize: '2px',
}

const size = {
  base: rem('16px'),
  xxxs: rem('12px'),
  xxs: rem('14px'),
  xs: rem('16px'),
  ls: rem('18px'),
  s: rem('20px'),
  sm: rem('24px'),
  m: rem('32px'),
  l: rem('48px'),
  xl: rem('60px'),
}

const spacing = {
  base: rem('16px'),
  xxxs: rem('4px'),
  xxs: rem('8px'),
  xxms: rem('10px'),
  xs: rem('12px'),
  xms: rem('14px'),
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

const colorBorder = color.border
const colorPrimary = color.primary
const zIndexM = zIndex.m
const mixin = {
  border: ({ color = colorBorder } = {}) => `border: ${value.borderSize} solid ${color}`,
  outline: () => `
    outline: ${colorPrimary} auto 5px;
    z-index: ${zIndexM};
  `,
  transition: () => 'transition: all 150ms;',
}

export const theme = {
  color,
  gradient,
  spacing,
  size,
  value,
  zIndex,
  mixin,
}
