import React, { Component } from 'react'
import { Input } from 'elements'
import PropTypes from 'prop-types'
import { BaseBreakpoints } from 'ui'

class BaseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typingTimeout: 0,
      value: props.value || '',
    }
  }

  handleChange = e => {
    e.preventDefault();

    const { value } = e.target;
    this.setState({ value });
    const { onChange } = this.props;
    const { typingTimeout } = this.state;


    if (typingTimeout) clearTimeout(typingTimeout);

    this.setState({
      typingTimeout: setTimeout(() => onChange(value), 300),
    });
  }

  render() {
    const { placeholder, modifiers } = this.props;
    const { value } = this.state;
    const modifiersWithNoMargin = ['noMargin', ...modifiers]
    return (
      <BaseBreakpoints render={({ md }) => (
        <>
          {md
            ? (
              <Input
                placeholder={placeholder}
                modifiers={modifiersWithNoMargin}
                onChange={this.handleChange}
                value={value}
              />
            )
            : (
              <Input
                placeholder={placeholder}
                modifiers={modifiers}
                onChange={this.handleChange}
                value={value}
              />
            )}
        </>
      )}
      />
    )
  }
}
BaseSearch.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
}
BaseSearch.defaultProps = {
  placeholder: 'Search',
  modifiers: [],
}


export default BaseSearch
