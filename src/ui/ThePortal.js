import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes, { element } from 'prop-types'

const portalRoot = document.getElementById('portal')

class ThePortal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

ThePortal.propTypes = {
  children: PropTypes.oneOfType([
    element,
    PropTypes.bool,
  ]),
}
ThePortal.defaultProps = {
  children: false,
}
export default ThePortal
