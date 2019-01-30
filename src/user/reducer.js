import {
  UPDATE_GATHER_REDIRECT,
} from './actions'

const initState = {
  gatherRedirect: '/',
}

export default function (state = initState, action) {
  const { type, data } = action
  switch (type) {
  case UPDATE_GATHER_REDIRECT:
    return {
      ...state,
      gatherRedirect: data,
    }
  default: {
    return {
      ...state,
    }
  }
  }
}
