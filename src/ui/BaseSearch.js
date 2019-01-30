import React, { Component } from 'react'
import { BaseFormInput } from 'ui'
import PropTypes from 'prop-types'

class BaseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typingTimeout: 0,
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    const { onChange } = this.props;
    const { typingTimeout } = this.state;

    if (typingTimeout) clearTimeout(typingTimeout);

    this.setState({
      typingTimeout: setTimeout(() => onChange(value), 300),
    });
  }

  render() {
    const { placeholder } = this.props;
    return <BaseFormInput placeholder={placeholder} onChange={this.handleChange} />
  }
}
BaseSearch.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
BaseSearch.defaultProps = {
  placeholder: 'Search',
}


export default BaseSearch
