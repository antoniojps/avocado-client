import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types'
import { BaseLoader } from 'ui'

const renderError = (error = 'Something went wrong') => <div>{error}</div>
const renderEndOfResults = () => <div>End of results</div>
const renderLoading = (context) => <BaseLoader message={`Loading ${context}...`} />
const renderNoResults = () => <div>We didnt find any results</div>

const BaseList = ({
  hasMore, children, loadMore, error, isLoading, context, list,
}) => {
  if (error && !isLoading) return renderError(error)
  if (!hasMore && list.lenght === 0) return renderNoResults()
  return (
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} pageStart={0}>
        {children}
      </InfiniteScroll>
      {!hasMore && renderEndOfResults()}
      {hasMore && isLoading && renderLoading(context)}
    </>
  )
}

BaseList.propTypes = {
  hasMore: PropTypes.bool,
  children: PropTypes.node.isRequired,
  loadMore: PropTypes.func.isRequired,
  error: PropTypes.bool,
  context: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({})),
}
BaseList.defaultProps = {
  error: false,
  context: 'items',
  list: [],
  hasMore: true,
}

export default BaseList
