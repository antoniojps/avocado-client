import React, { Component } from 'react'
import {
  BasePage, BaseSearch, BaseToggle, BaseModal,
} from 'ui'
import { Button, Container, Title } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
import { fetch } from 'utilities/requests'
import withUnits from './withUnits';
import UnitCreateFrom from './UnitCreateForm';

class PageUnits extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      firstSearch: true,
      unitTypes: null,
    }
    this.toggleRef = React.createRef();
  }

  async componentDidMount() {
    this.fetchUnits({ update: true });
    const { data: { data } } = await fetch({ url: 'unittype' });
    this.setState({ unitTypes: data })
  }

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchUnits({ search, update: true }))
  }

  handleDelete = (e, id) => {
    e.preventDefault()
    const { deleteUnit } = this.props;
    deleteUnit(id)
  }

  renderAction = (type = 'Add', unit = null) => {
    const { unitTypes } = this.state;
    return (
      <BaseToggle ref={this.toggleRef}>
        {({ isOn, toggle }) => (
          <>
            <Button modifiers={type === 'Add' ? ['primary'] : ['primary', 'small']} onClick={toggle}>
              {`${type} unit`}
            </Button>
            <BaseModal toggle={toggle} isOn={isOn}>
              <UnitCreateFrom
                types={unitTypes}
                onSubmit={toggle}
                type={type}
                unit={unit}
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

  fetchUnits = ({ update }) => {
    const { search, firstSearch } = this.state
    const {
      getUnits, isLoading, hasMore, current_page, // eslint-disable-line
    } = this.props;
    const searchParams = this.getSearchParam();
    if (firstSearch) {
      if (searchParams) {
        getUnits({ search: searchParams, page: 1 })
      } else {
        getUnits({ page: 1 })
      }
      this.setState({ firstSearch: false, search: searchParams })
    }
    const page = update ? 1 : current_page + 1// eslint-disable-line
    if (!isLoading && (hasMore || page === 1) && !firstSearch) getUnits({ search, page })
  }

  render() {
    const { list } = this.props
    return (
      <BasePage
        page={{ title: 'Units' }}
        sideHeader={(
          <BaseSearch onChange={this.handleSearch} value={this.getSearchParam()} />
        )}
      >
        <>
          {this.renderAction('Add')}
          <BaseList {...this.props} context="units" fetchList={() => this.fetchUnits} loadMore={this.fetchUnits}>
            {list.map((unit) => (
              <Container key={unit.id}>
                <Title>{`${unit.id} and ${unit.name}`}</Title>
                {this.renderAction('Edit', unit)}
                <Button modifiers={['small', 'danger']} onClick={(e) => this.handleDelete(e, unit.id)}>Delete</Button>
              </Container>
            ))}
          </BaseList>
        </>
      </BasePage>
    )
  }
}

PageUnits.propTypes = {
  getUnits: PropTypes.func.isRequired,
  deleteUnit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  current_page: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  hasMore: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
}
PageUnits.defaultProps = {
  isLoading: false,
  current_page: 0,
  list: [],
  hasMore: false,
}
export default withUnits(PageUnits)
