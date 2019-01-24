import React from 'react'
import { connect } from 'react-redux'
import { Button, Subtitle } from 'elements'
import { bindActionCreators } from 'redux'
import { toggleMessage } from 'ui/actions'

const Example = ({ messageVisibility, toggleMessage }) => (
  <>
    <Subtitle>
      {messageVisibility
        ? 'Set to true'
        : 'Set to false'
      }
    </Subtitle>
    <Button onClick={toggleMessage}>
      Change state
    </Button>
  </>
)

const mapStateToProps = state => ({
  messageVisibility: state.ui.messageVisibility,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Example)
