import React from 'react'
import { P } from 'elements'
import { BasePage } from 'ui'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import illustrationNotFound from 'assets/notFound.svg'

const PageNotFound = (props) => (
  <BasePage
    page={{
      title: 'No avocados here...',
    }}
    wrapContainer={false}
  >
    <Wrapper>
      <P>
        I know you want big pussy...
        Looks like you came to the wrong page.
        <br />
        <Link to="/">
          Go back to home page.
        </Link>
      </P>
      <Illustration src={illustrationNotFound} alt="404 not found" />
    </Wrapper>
  </BasePage>
)

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const Illustration = styled.img`
  width: 20%;
  padding: ${props => props.theme.spacing.xxs};
  margin-left: auto;
  margin-right: auto;
`

export default PageNotFound
