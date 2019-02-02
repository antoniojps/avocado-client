import React, { Component } from 'react'
import { Title, Container } from 'elements'
import InfiniteScroll from 'react-infinite-scroller';

export default class ListUnits extends Component {
  getMoreItems = () => {
    const {
      getUnits, current_page, search, isLoading,
    } = this.props
    console.log('getting more items', this.props);
    if (!isLoading) getUnits({ page: current_page + 1, search })
  }

  render() {
    const { list, hasMore } = this.props;
    return (
      <InfiniteScroll loadMore={this.getMoreItems} hasMore={hasMore} pageStart={0}>
        {list.map(({ id, name }) => <Container key={id}><Title>{name}</Title></Container>)}
      </InfiniteScroll>
    )
  }
}
