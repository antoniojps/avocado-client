import React from 'react'
import { connect } from 'react-redux'
import { Button, P } from 'elements'
import { bindActionCreators } from 'redux'
import { getStarship } from 'docs/actions'

const ExampleRequestStarship = ({
  getStarship,
  starship,
  loading,
  error,
}) => (
  <>
    <Button onClick={getStarship}>
        Request starship
    </Button>
    <div>
      {error
          && (
            <>
              <P>
                Error!
              </P>
            </>
          )}
      {loading
          && (
            <P>
              Loading...
            </P>
          )}
      {starship
          && (
            <>
              <P>
                Name:
                {' '}
                {starship.name}
              </P>
              <P>
                Manufacturer:
                {' '}
                {starship.manufacturer}
              </P>
            </>
          )}
    </div>
  </>
)

const mapStateToProps = state => ({
  starship: state.docs.starship,
  loading: state.docs.starshipLoading,
  error: state.docs.starshipError,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getStarship,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ExampleRequestStarship)
