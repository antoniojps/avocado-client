import { rem } from 'polished'
import { css, keyframes } from 'styled-components'

const color = {
  base: '#363636',
  baseInverse: '#FFFFFF',
  baseLighter: '#7A7A7A',
  primary: '#40CB89',
  primaryDarker: '#2AB875',
  border: '#E6E6E6',
  borderBtn: '#DDDDDD',
  bg: '#F5F5F5',
  bgLighter: '#FFFFFF',
  bgDark: '#242424',
  bgPrimary: '#42705C',
  danger: '#FB6D77',
  dangerDarker: '#EB4D5D',
  blue: '#3273DC',
  purple: '#B86BFF',
  warning: '#F5874A',
  success: '#40CB89',
  yellow: '#FFDD57',
  star: '#FFDD57',
  gray: '#e8e8e8',
}

const gradient = {
  bg: () => css`
    background-image: linear-gradient(-90deg, #408263 2%, #42705C 100%);
  `,
}

const calendar = {
  bg: color.bgLighter,
  offRangeBg: color.bg,
  offRangeColor: color.bgLighter,
  eventColor: color.base,
  eventOwnColor: color.baseInverse,
}

const modal = {
  bg: color.bgPrimary,
}

const value = {
  borderRadius: '8px',
  borderSize: '2px',
  transition: '150ms',
}

const width = {
  s: '300px',
  m: '600px',
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
  ml: rem('42px'),
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
  negative: -10,
  s: 0,
  m: 10,
  l: 20,
  ml: 30,
  xl: 40,
  xxl: 50,
  above: 100,
}

const colorBorder = color.border
const colorPrimary = color.primary
const { borderSize } = value
const zIndexM = zIndex.m
const mixin = {
  border: ({ color = colorBorder, size = borderSize, orientation = null } = {}) => {
    let style = `border: ${size} solid ${color};`
    if (orientation) {
      if (orientation === 'horizontal') style += 'border-left: 0;'
      else style += 'border-bottom: 0;'
    }
    return style
  },
  outline: () => `
    outline: ${colorPrimary} auto 5px;
    z-index: ${zIndexM};
  `,
  transition: () => 'transition: all 150ms;',
}

const animation = {
  pulse: keyframes`
    0% {transform: scale(0.94);}
    50% {transform: scale(1);}
    100% {transform: scale(0.94);}
  `,
  pop: keyframes`
    0% {
      opacity:0;
      transform: scale(0);
    }
    100% {transform: scale(1);}
  `,
  bounce: keyframes`
    0%, 100% {
      transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
    }
  `,
}

export const theme = {
  color,
  gradient,
  spacing,
  size,
  value,
  zIndex,
  mixin,
  animation,
  width,
  calendar,
  modal,
}
