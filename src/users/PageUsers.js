import React, { Component } from 'react'
import {
  BasePage, BaseSearch, BaseToggle, BaseModal,
} from 'ui'
import { Button } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
// import { fetch } from 'utilities/requests'
import withUsers from './withUsers';
// import UserCreateFrom from './UserCreateForm';
import CardTeam from './CardTeam'

class PageUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      firstSearch: true,
      // userTypes: null,
    }
    this.toggleRef = React.createRef();
  }

  // async componentDidMount() {
  //   this.fetchUsers({ update: true });
  //   const { data: { data } } = await fetch({ url: 'usertype' });
  //   this.setState({ userTypes: data })
  // }

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchUsers({ search, update: true }))
  }

  handleDelete = (e, id) => {
    e.preventDefault()
    const { deleteUser } = this.props;
    deleteUser(id)
  }

  renderAction = (type = 'Add', user = null) => (
    <BaseToggle ref={this.toggleRef}>
      {({ isOn, toggle }) => (
        <>
          <Button modifiers={type === 'Add' ? ['primary'] : ['primary', 'small']} onClick={toggle}>
            {`${type} user`}
          </Button>
          <BaseModal toggle={toggle} isOn={isOn}>
            {/* <UserCreateFrom
                types={userTypes}
                onSubmit={toggle}
                type={type}
                user={user}
              /> */}
          </BaseModal>
        </>
      )}
    </BaseToggle>
  )


  getSearchParam = () => {
    const { location: { search: localSearch } } = this.props;
    const params = new URLSearchParams(localSearch);
    return params.get('search');
  }

  fetchUsers = ({ update }) => {
    const { search, firstSearch } = this.state
    const {
      getUsers, isLoading, hasMore, current_page, // eslint-disable-line
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
    const page = update ? 1 : current_page + 1// eslint-disable-line
    if (!isLoading && (hasMore || page === 1) && !firstSearch) getUsers({ search, page })
  }

  render() {
    const { list } = this.props
    return (
      <BasePage
        page={{
          title: 'Manage',
          subtitle: 'Manage the team',
          description: 'Search your team or remove someone from the workspace',
        }}
        sideHeader={(
          <>
            {/* {this.renderAction('Add')} */}
            <BaseSearch onChange={this.handleSearch} value={this.getSearchParam()} />
          </>
        )}
        wrapContainer={false}
      >
        <BaseList {...this.props} context="users" fetchList={() => this.fetchUsers} loadMore={this.fetchUsers}>
          {list.map((team) => (
            <CardTeam
              renderDelete={<Button modifiers={['small', 'danger']} onClick={(e) => this.handleDelete(e, team.id)}>Delete</Button>}
              key={team.id}
              team={team}
            />
          ))}
        </BaseList>
      </BasePage>
    )
  }
}

PageUsers.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  current_page: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  hasMore: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
}
PageUsers.defaultProps = {
  isLoading: false,
  current_page: 0,
  list: [],
  hasMore: false,
}
export default withUsers(PageUsers)
