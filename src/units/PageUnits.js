import React, { Component } from 'react'
import { BasePage, BaseSearch } from 'ui'
import { Button } from 'elements'
import withUnits from './withUnits';
import ListUnits from './ListUnits';
import withFeedback from './withFeedback';

const List = withFeedback(ListUnits);

class PageUnits extends Component {
  componentDidMount() {
    const { getUnits } = this.props;
    getUnits({ page: 1 });
  }

  handleClick = () => this.props.getUnits({ page: 1, search: 'Continente aveiro' })

  handleSearch = (search) => this.props.getUnits({ page: 1, search: search || '', reset: true })

  render() {
    return (
      <BasePage
        page={{
          title: 'Units',
        }}
        sideHeader={(
          <>
            <Button modifiers={['primary']} onClick={this.handleClick}>Add unit</Button>
            <BaseSearch onChange={this.handleSearch} />
          </>
        )}
      >
        <List {...this.props} context="units" />
      </BasePage>
    )
  }
}
export default withUnits(PageUnits)
