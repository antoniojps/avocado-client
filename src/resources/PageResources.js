import React, { Component } from 'react'
import {
  BasePage, BaseSearch, BaseToggle, BaseModal,
} from 'ui'
import { Button } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
import { fetch } from 'utilities/requests'
import withResources from './withResources';
import ResourceCreateFrom from './ResourceCreateFrom';
import CardResource from './CardResource'

class PageResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      firstSearch: true,
      resourceTypes: null,
    }
    this.toggleRef = React.createRef();
  }

  async componentDidMount() {
    this.fetchResources({ update: true });
    const { data: { data } } = await fetch({ url: 'resourcetype' });
    this.setState({ resourceTypes: data })
  }

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchResources({ search, update: true }))
  }

  handleDelete = (e, id) => {
    e.preventDefault()
    const { deleteResource } = this.props;
    deleteResource(id)
  }

  computedModifiers = (type = 'Add') => {
    if (type === 'Add') return ['primary']
    return ['small']
  }

  renderAction = (type = 'Add', resource = null) => {
    const { resourceTypes } = this.state;
    return (
      <BaseToggle ref={this.toggleRef}>
        {({ isOn, toggle }) => (
          <>
            <Button modifiers={this.computedModifiers(type)} onClick={toggle}>
              {`${type}`}
            </Button>
            <BaseModal toggle={toggle} isOn={isOn}>
              <ResourceCreateFrom
                types={resourceTypes}
                onSubmit={toggle}
                type={type}
                resource={resource}
              />
            </BaseModal>
          </>
        )}
      </BaseToggle>
    )
  }


  getSearchParam = () => {
    const { location: { search: localSearch } } = this.props;
    const params = new URLSearchParams(localSearch);
    return params.get('search');
  }

  fetchResources = ({ update }) => {
    const { search, firstSearch } = this.state
    const {
      getResources, isLoading, hasMore, current_page, // eslint-disable-line
    } = this.props;
    const searchParams = this.getSearchParam();
    if (firstSearch) {
      if (searchParams) {
        getResources({ search: searchParams, page: 1 })
      } else {
        getResources({ page: 1 })
      }
      this.setState({ firstSearch: false, search: searchParams })
    }
    const page = update ? 1 : current_page + 1// eslint-disable-line
    if (!isLoading && (hasMore || page === 1) && !firstSearch) getResources({ search, page })
  }

  render() {
    const { list } = this.props
    return (
      <BasePage
        page={{ title: 'Resources' }}
        sideHeader={(
          <BaseSearch onChange={this.handleSearch} value={this.getSearchParam()} />
        )}
        wrapContainer={false}
      >
        <>
          {this.renderAction('Add')}
          <BaseList {...this.props} context="resources" fetchList={() => this.fetchResources} loadMore={this.fetchResources}>
            {list.map((resource) => (
              <CardResource
                renderDelete={<Button modifiers={['small', 'danger']} onClick={(e) => this.handleDelete(e, resource.id)}>Delete</Button>}
                renderEdit={this.renderAction('Edit', resource)}
                key={resource.id}
                resource={resource}
              />
            ))}
          </BaseList>
        </>
      </BasePage>
    )
  }
}

PageResources.propTypes = {
  getResources: PropTypes.func.isRequired,
  deleteResource: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  current_page: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  hasMore: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
}
PageResources.defaultProps = {
  isLoading: false,
  current_page: 0,
  list: [],
  hasMore: false,
}
export default withResources(PageResources)
