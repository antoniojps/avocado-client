import {
  REQUEST_STARSHIP_LOADING,
  REQUEST_STARSHIP_SUCCESS,
  REQUEST_STARSHIP_FAILURE,
} from './actions'

const initialState = {
  starship: null,
  starshipLoading: false,
  starshipError: false,
}

export default function (state = initialState, action) {
  const { type, data } = action
  switch (type) {
    case REQUEST_STARSHIP_LOADING:
      return {
        ...state,
        starship: null,
        starshipLoading: true,
        starshipError: false,
      }
    case REQUEST_STARSHIP_SUCCESS:
      return {
        ...state,
        starship: data,
        starshipLoading: false,
        starshipError: false,
      }
    case REQUEST_STARSHIP_FAILURE:
      return {
        ...state,
        starship: null,
        starshipLoading: false,
        starshipError: true,
      }
    default:
      return state
  }
}
