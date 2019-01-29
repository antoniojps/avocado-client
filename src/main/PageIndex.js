import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import {
  Title,
  P,
  Button,
} from 'elements'
import {
  BasePageMain,
} from 'ui'
import { above } from 'utilities'
import illustration from 'assets/landingPage.svg'
import { BaseBreakpoints } from 'ui'

const PageIndex = (props) => {
  const { history: { push } } = props
  const goToPageCreate = () => push('/create')

  return (
  <BasePageMain>
    <Wrapper>
      <Title>
        A planning platform of food safety audits
        {' '}
        <TextPrimary>
          from the future!
        </TextPrimary>
      </Title>
      <StyledButton
        pulse
        onClick={goToPageCreate}
        modifiers={['primary', 'noMargin', 'important']}
      >
        Get started
      </StyledButton>
      <P>
        Rated 5 stars by everyone in the world
      </P>

      <BaseBreakpoints render={({ md }) => md && (
        <img src={illustration} alt="avocado illustration" />
      )} />
    </Wrapper>
  </BasePageMain>
)}

const Wrapper = styled.div`
  text-align: initial;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  ${Title} {
    font-size: ${props => props.theme.size.m};
    ${above.md`
      font-size: ${props => props.theme.size.l};
    `}
  }
  ${above.md`
    margin-top: ${props => props.theme.spacing.l};
    text-align: center;
    max-width: 764px;
  `}
  img {
    transform: ${props => `translate(0, -100px)`};
    z-index: ${props => props.theme.zIndex.s};
  }
`

const StyledButton = styled(Button)`
  min-width: 300px;
  margin-bottom: ${props => props.theme.spacing.ms};
  z-index: ${props => props.theme.zIndex.l};
`

const TextPrimary = styled.span`
  color: ${props => props.theme.color.primaryDarker};
`

export default withRouter(PageIndex)
