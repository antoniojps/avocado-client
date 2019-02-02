import React, { Component } from 'react'
import { BasePage, BaseSearch } from 'ui'
import { Button, Container, Title } from 'elements'
import BaseList from 'ui/BaseList';
import PropTypes from 'prop-types'
import withUnits from './withUnits';

class PageUnits extends Component {
  state = {
    search: '',
  }

  handleClick = () => console.log('handle add click')

  handleSearch = (search) => {
    this.setState({ search }, () => this.fetchUnits({ search, page: 1 }))
  }

  fetchUnits = ({ page }) => {
    const { search } = this.state
    const {
      getUnits, isLoading, hasMore,
    } = this.props;
    if (!isLoading && (hasMore || page === 1)) getUnits({ search, page })
  }

  render() {
    const { current_page, list } = this.props
    return (
      <BasePage
        page={{ title: 'Units' }}
        sideHeader={(
          <>
            <Button modifiers={['primary']} onClick={this.handleClick}>Add unit</Button>
            <BaseSearch onChange={this.handleSearch} />
          </>
        )}
      >
        <BaseList {...this.props} context="units" fetchList={this.fetchUnits({ page: current_page + 1 })} loadMore={this.fetchUnits}>
          {list.map(({ name, id }) => <Container key={id}><Title>{`${id} and ${name}`}</Title></Container>)}
        </BaseList>
      </BasePage>
    )
  }
}

PageUnits.propTypes = {
  getUnits: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  current_page: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  hasMore: PropTypes.bool,
}
PageUnits.defaultProps = {
  isLoading: false,
  current_page: 0,
  list: [],
  hasMore: false,
}
export default withUnits(PageUnits)
