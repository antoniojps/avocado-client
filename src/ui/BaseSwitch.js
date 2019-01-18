import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { P } from 'elements'

export default class BaseSwitch extends Component {
  constructor(props) {
    super(props)

    const { isChecked } = props
    this.state = {
      isChecked,
    }
  }

  handleChange = () => {
    const { onChange } = this.props
    const { isChecked } = this.state
    this.setState({ isChecked: !isChecked })
    if (typeof onChange !== 'function') return console.error('onChange must be a function in Switch component!')
    onChange()
  }

  isCheckedFromProps = () => {
    const { isChecked } = this.props
    return isChecked
  }

  render() {
    const { isChecked } = this.state
    const { children } = this.props
    return (
      <Wrapper>
        <Switch isChecked>
          <input type="checkbox" onChange={this.handleChange} checked={isChecked} />
          <span />
        </Switch>
        {children
          && (
            <P>
              {children}
            </P>
          )
        }
      </Wrapper>
    )
  }
}

BaseSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
}

BaseSwitch.defaultProps = {
  isChecked: false,
}

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
    opacity: 0;
    &:checked + span {
      background-color: ${props => props.theme.color.primaryDarker};
    }
    /* active */
    &:checked + span:before {
      transform: translateX(18px);
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.color.baseLighter};
    transition: 200ms;
    border-radius: 13px;

    /* circle */
    &:before {
      position: absolute;
      border-radius: 50%;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 3px;
      background-color: ${props => props.theme.color.bgLighter};
      transition: 200ms;
    }
  }
`

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  p {
    margin-left: ${props => props.theme.spacing.xs};
    padding-bottom: 0;
  }
  margin-bottom: ${props => props.theme.spacing.base};
`
