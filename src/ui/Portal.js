import { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes, { element } from 'prop-types'

const portalRoot = document.getElementById('portal')

class Portal extends Component {
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

Portal.propTypes = {
  children: PropTypes.oneOfType([
    element,
    PropTypes.bool,
  ]),
}
Portal.defaultProps = {
  children: false,
}
export default Portal
