import React from 'react'
import { P } from 'elements'
import { BasePage } from 'ui'
import styled from 'styled-components'
import illustrationNotFound from 'assets/workInProgress.svg'

const PageNotFound = (props) => (
  <BasePage
    page={{
      title: 'Coming soon',

    }}
    wrapContainer={false}
  >
    <Wrapper>
      <P>
        This page is coming soon...
        <br />
      </P>
      <Illustration src={illustrationNotFound} alt="404 not found" />
    </Wrapper>
  </BasePage>
)

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Illustration = styled.img`
  width: 30%;
  padding: ${props => props.theme.spacing.xxs};
`

export default PageNotFound
