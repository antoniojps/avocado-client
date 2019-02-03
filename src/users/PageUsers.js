import React, { Component } from 'react'
import { BasePage, BaseSearch } from 'ui'
import { Button, Container, Title } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
import withUsers from './withUsers';

class PageUsers extends Component {
  state = {
    search: '',
    firstSearch: true,
  }

  componentDidMount() {
    this.fetchUsers({ update: true });
  }

  handleClick = () => console.log('handle add click')

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchUsers({ search, update: true }))
  }

  getSearchParam = () => {
    const { location: { search: localSearch } } = this.props;
    const params = new URLSearchParams(localSearch);
    return params.get('search');
  }

  fetchUsers = ({ update }) => {
    const { search, firstSearch } = this.state
    const {
      getUsers, isLoading, hasMore, current_page,
    } = this.props;
    const searchParams = this.getSearchParam();
    if (firstSearch) {
      if (searchParams) {
        getUsers({ search: searchParams, page: 1 })
      } else {
        getUsers({ page: 1 })
      }
      this.setState({ firstSearch: false, search: searchParams })
    }
    const page = update ? 1 : current_page + 1
    if (!isLoading && (hasMore || page === 1) && !firstSearch) getUsers({ search, page })
  }

  render() {
    const { list } = this.props
    return (
      <BasePage
        page={{ title: 'Team' }}
        sideHeader={(
          <>
            <Button modifiers={['primary']} onClick={this.handleClick}>Add team members</Button>
            <BaseSearch onChange={this.handleSearch} value={this.getSearchParam()} />
          </>
        )}
      >
        <BaseList {...this.props} context="users" fetchList={() => this.fetchUsers} loadMore={this.fetchUsers}>
          {list.map(({ name, id }) => <Container key={id}><Title>{`${id} and ${name}`}</Title></Container>)}
        </BaseList>
      </BasePage>
    )
  }
}

PageUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  current_page: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  hasMore: PropTypes.bool,
}
PageUsers.defaultProps = {
  isLoading: false,
  current_page: 0,
  list: [],
  hasMore: false,
}
export default withUsers(PageUsers)
