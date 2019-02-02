import React, { Component } from 'react'
import styled from 'styled-components'
import { Container } from 'elements'
import { BaseBreadcrumb } from 'ui'

export default class PageLogin extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <BaseBreadcrumb />
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
    padding: ${props => props.theme.spacing.base};
    width: 100%;
    height: 100%;
    ${props => props.theme.gradient.bg()};
    ${Container} {
      max-width: ${props => props.theme.width.m};
      margin-left: auto;
      margin-right: auto;
      margin-top: ${props => props.theme.spacing.xxl};
    }
`
