import { TOGGLE_MESSAGE } from './actions'

const initialState = {
  messageVisibility: false,
}

export default function (state = initialState, action) {
  const { type } = action
  switch (type) {
    case TOGGLE_MESSAGE:
      return {
        ...state,
        messageVisibility: !state.messageVisibility,
      }
    default:
      return state
  }
}
