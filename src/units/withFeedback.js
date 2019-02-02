import React from 'react'

export default (WrappedComponent) => {
  const FeedBack = ({ ...props }) => {
    const { error, isLoading, hasMore } = props;
    if (error) {
      return 'Something went wrong'
    }
    return (
      <>
        <WrappedComponent {...props} />
        {isLoading && <div>Loading</div>}
        {!hasMore && <div>Fim de resultados</div>}
      </>
    )
  }

  FeedBack.propTypes = {
  }

  return FeedBack
}
