import { Component } from 'react'
import PropTypes from 'prop-types'

export default class BaseToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOn: props.isOn,
    }
  }

  toggle = () => {
    const { isOn } = this.state
    this.setState({
      isOn: !isOn,
    })
  }

  render() {
    const { children } = this.props
    const { isOn } = this.state
    return children({
      isOn,
      toggle: this.toggle,
    })
  }
}

BaseToggle.propTypes = {
  isOn: PropTypes.bool,
}

BaseToggle.defaultProps = {
  isOn: false,
}
