import styled from 'styled-components'
import PropTypes from 'prop-types'

const Emoji = styled.span.attrs({
  label: props => props.label,
  role: 'img',
})`
  display: inline-flex;
  font-size: 2rem;
  padding-right: 1rem;
`

Emoji.propTypes = {
  label: PropTypes.string,
}

Emoji.defaultProps = {
  label: 'emoji',
}

export default Emoji
