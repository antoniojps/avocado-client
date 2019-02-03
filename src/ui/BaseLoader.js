import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spring } from 'react-spring'
import { P } from 'elements'
import { transparentize } from 'polished'

export default class BaseLoader extends Component {
  state = {
    reverse: false,
  }

  onAnimationEnd = async () => {
    await this.reverse()
  }

  reverse = () => new Promise((resolve) => {
    const { reverse } = this.state
    this.setState({
      reverse: !reverse,
    }, resolve)
  })

  render() {
    const { reverse } = this.state
    const { message, center } = this.props
    return (
      <Loader center={center}>
        <Spring
          reset
          reverse={reverse}
          onRest={this.onAnimationEnd}
          from={{ x: 228, opacity: 0.5 }}
          to={{ x: 0, opacity: 0 }}
        >
          {props => (
            <svg
              width="30"
              height="49"
              viewBox="0 0 30 49"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={114}
              strokeDashoffset={props.x}
              stroke="#40CB89"
              strokeWidth="3"
              fill="none"
              fillRule="evenodd"
            >
              <defs>
                <linearGradient x1="50%" y1="1.804%" x2="50%" y2="100%" id="a">
                  <stop stopColor="#3CC888" offset="0%" />
                  <stop stopColor="#BDF188" offset="100%" />
                </linearGradient>
              </defs>
              <path d="M15 47.5c7.463 0 13.5-5.906 13.5-13.175 0-4.17-1.804-12.722-4.305-19.695C21.27 6.475 17.815 1.5 15 1.5c-2.694 0-5.997 4.572-8.858 12.21C3.472 20.84 1.5 29.94 1.5 34.325 1.5 41.594 7.537 47.5 15 47.5z" fill="url(#a)" fillOpacity={props.opacity} />
            </svg>
          )}
        </Spring>

        {message
        && <P>{message}</P>
        }

      </Loader>
    )
  }
}

const Loader = styled.div`
  display: ${props => (props.center ? 'flex' : 'inline-flex')};
  flex-direction: column;
  align-items: ${props => (props.center ? 'center' : 'stretch')};
  p {
    padding-top: ${props => props.theme.spacing.base};
  }
`

BaseLoader.propTypes = {
  message: PropTypes.string,
  center: PropTypes.bool,
}

BaseLoader.defaultProps = {
  message: null,
  center: true,
}

export const BaseLoading = () => (
  <Loading>
    <Loading.Spinner>
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </Loading.Spinner>
  </Loading>
)


const Loading = styled.div`
  position: absolute;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: ${props => props.theme.value.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`
Loading.Spinner = styled.div`
  width: 40px;
  height: 100%;
  position: relative;

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${props => transparentize(0.5, props.theme.color.bgLighter)};
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    animation: ${props => props.theme.animation.bounce} 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    animation-delay: -1.0s;
    background-color: ${props => transparentize(0.1, props.theme.color.bgLighter)};
  }
`
