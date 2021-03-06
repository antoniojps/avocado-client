import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types'
import { BaseLoader } from 'ui'
import { P } from 'elements'

const renderError = (error = 'Something went wrong') => <div>{error}</div>
const renderEndOfResults = () => <P>...end of results</P>
const renderLoading = (context) => <BaseLoader message={`Loading ${context}...`} />
const renderNoResults = () => <div>We didnt find any results</div>

const BaseList = ({
  hasMore, children, loadMore, error, isLoading, context, list,
}) => {
  if (error && !isLoading) return renderError(error)
  if (!hasMore && +list.length === 0) return renderNoResults()
  return (
    <>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} pageStart={1}>
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
