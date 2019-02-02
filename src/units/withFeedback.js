import React from 'react'
import { BaseLoader } from 'ui'

export default (WrappedComponent) => {
  const FeedBack = ({ ...props }) => {
    const {
      error, isLoading, hasMore, context, list,
    } = props;
    if (error) {
      return 'Something went wrong'
    }
    return (
      <>
        <WrappedComponent {...props} />
        {isLoading && <BaseLoader message={`Loading ${context}...`} />}
        {!hasMore && list.length > 0 && <div>Fim de resultados</div>}
        {!hasMore && list.length < 1 && <div>Sem resultados</div>}
      </>
    )
  }

  FeedBack.propTypes = {
  }

  return FeedBack
}
