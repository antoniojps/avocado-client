import React, { Component } from 'react'
import { BasePage, BaseSearch } from 'ui'
import { Button, Container, Title } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
import withResources from './withResources';

class PageResources extends Component {
  state = {
    search: '',
    firstSearch: true,
  }

  componentDidMount() {
    this.fetchResources({ update: true });
  }

  handleAdd = () => console.log('handle add click')

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchResources({ search, update: true }))
  }

  handleDelete = (e, id) => {
    e.preventDefault()
    const { deleteResource } = this.props;
    deleteResource(id)
  }

  getSearchParam = () => {
    const { location: { search: localSearch } } = this.props;
    const params = new URLSearchParams(localSearch);
    return params.get('search');
  }

  fetchResources = ({ update }) => {
    const { search, firstSearch } = this.state
    const {
      getResources, isLoading, hasMore, current_page,
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
    const page = update ? 1 : current_page + 1
    if (!isLoading && (hasMore || page === 1) && !firstSearch) getResources({ search, page })
  }

  render() {
    const { list } = this.props
    return (
      <BasePage
        page={{ title: 'Resources' }}
        sideHeader={(
          <>
            <Button modifiers={['primary']} onClick={this.handleAdd}>Add resource</Button>
            <BaseSearch onChange={this.handleSearch} value={this.getSearchParam()} />
          </>
        )}
      >
        <BaseList {...this.props} context="resources" fetchList={() => this.fetchResources} loadMore={this.fetchResources}>
          {list.map(({ name, id }) => (
            <Container key={id}>
              <Title>{`${id} and ${name}`}</Title>
              <Button modifiers={['small', 'danger']} onClick={(e) => this.handleDelete(e, id)}>Delete</Button>
            </Container>
          ))}
        </BaseList>
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
}
PageResources.defaultProps = {
  isLoading: false,
  current_page: 0,
  list: [],
  hasMore: false,
}
export default withResources(PageResources)
