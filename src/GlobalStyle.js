import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    height: 100%;
    font-size: 16px;
    ${props => props.theme.gradient.bg()};
    background-color: ${props => props.theme.color.bgPrimary};
  }

  #root {
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.color.bg};
  }

  a {
    color: ${props => props.theme.color.primaryDarker};
    display: inline-block;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  `

export default GlobalStyle
