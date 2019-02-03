import {
  UPDATE_GATHER_REDIRECT,
  LOGIN_USER_LOADING,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  FETCH_WARMUP_LOADING,
  FETCH_WARMUP_FAILURE,
  FETCH_WARMUP_SUCCESS,
} from './actions'

const initState = {
  gatherRedirect: '/',
  user: null,
  userLoading: false,
  userFailure: false,
  userAuthenticated: false,
  userToken: null,
  warmup: null,
  warmupLoading: false,
  warmupFailure: false,
}

export default function (state = initState, action) {
  const { type, data } = action
  switch (type) {
  case UPDATE_GATHER_REDIRECT:
    return {
      ...state,
      gatherRedirect: data,
    }
  case FETCH_WARMUP_LOADING:
    return {
      ...state,
      warmup: null,
      warmupLoading: true,
      warmupFailure: false,
    }
  case FETCH_WARMUP_SUCCESS:
    return {
      ...state,
      warmup: data.data,
      warmupLoading: false,
      warmupFailure: false,
    }
  case FETCH_WARMUP_FAILURE:
    return {
      ...state,
      warmup: null,
      warmupLoading: false,
      warmupFailure: data,
    }
  case LOGIN_USER_LOADING:
    return {
      ...state,
      user: null,
      userLoading: true,
      userFailure: false,
      userAuthenticated: false,
    }
  case LOGIN_USER_SUCCESS:
    return {
      ...state,
      user: data,
      userToken: data.token,
      userLoading: false,
      userFailure: false,
      userAuthenticated: true,
    }
  case LOGIN_USER_FAILURE:
    return {
      ...state,
      user: null,
      userLoading: false,
      userFailure: data.response.data,
      userAuthenticated: false,
    }
  default: {
    return {
      ...state,
    }
  }
  }
}
