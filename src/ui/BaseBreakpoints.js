import React, { Component } from 'react'
import { size } from 'utilities'
import PropTypes from 'prop-types'

export default class BaseBreakpoints extends Component {
  state = {
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  sm = () => this.state.windowWidth >= size.sm

  md = () => this.state.windowWidth >= size.md

  lg = () => this.state.windowWidth >= size.lg

  updateDimensions = () => {
    this.setState({
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    })
  }

  render() {
    const { render } = this.props
    return (
      <>
        {render({
          sm: this.sm(),
          md: this.md(),
          lg: this.lg(),
        })}
      </>
    )
  }
}

BaseBreakpoints.propTypes = {
  render: PropTypes.func.isRequired,
}


