import {
  UPDATE_GATHER_REDIRECT,
  LOGIN_USER_LOADING,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
} from './actions'

const initState = {
  gatherRedirect: '/',
  user: null,
  userLoading: false,
  userFailure: false,
  userAuthenticated: false,
  userToken: null,
}

export default function (state = initState, action) {
  const { type, data } = action
  switch (type) {
  case UPDATE_GATHER_REDIRECT:
    return {
      ...state,
      gatherRedirect: data,
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
