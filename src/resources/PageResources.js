import React, { Component } from 'react'
import { BasePage, BaseSearch } from 'ui'
import { Button, Container, Title } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
import withResources from './withResources';

class PageResources extends Component {
  state = {
    search: '',
  }

  handleClick = () => console.log('handle add click')

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchResources({ search, update: true }))
  }

  fetchResources = ({ update }) => {
    const { search } = this.state
    const {
      getResources, isLoading, hasMore, current_page,
    } = this.props;
    const page = update ? 1 : current_page + 1
    if (!isLoading && (hasMore || page === 1)) getResources({ search, page })
  }

  render() {
    const { list } = this.props
    return (
      <BasePage
        page={{ title: 'Resources' }}
        sideHeader={(
          <>
            <Button modifiers={['primary']} onClick={this.handleClick}>Add resource</Button>
            <BaseSearch onChange={this.handleSearch} />
          </>
        )}
      >
        <BaseList {...this.props} context="resources" fetchList={() => this.fetchResources} loadMore={this.fetchResources}>
          {list.map(({ name, id }) => <Container key={id}><Title>{`${id} and ${name}`}</Title></Container>)}
        </BaseList>
      </BasePage>
    )
  }
}

PageResources.propTypes = {
  getResources: PropTypes.func.isRequired,
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
