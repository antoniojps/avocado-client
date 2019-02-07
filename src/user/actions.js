export const UPDATE_GATHER_REDIRECT = 'UPDATE_GATHER_REDIRECT'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_LOADING = 'REGISTER_USER_LOADING'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'
export const FETCH_WARMUP = 'FETCH_WARMUP'
export const FETCH_WARMUP_LOADING = 'FETCH_WARMUP_LOADING'
export const FETCH_WARMUP_FAILURE = 'FETCH_WARMUP_FAILURE'
export const FETCH_WARMUP_SUCCESS = 'FETCH_WARMUP_SUCCESS'

export const updateGatherRedirect = (url) => {
  let path = url
  const invalid = ['/gather', '/login']
  // prevent looping to /gather
  if (invalid.includes(url)) path = '/'
  return {
    type: UPDATE_GATHER_REDIRECT,
    data: path,
  }
}

export const fetchWarmup = (data) => ({
  type: FETCH_WARMUP,
  data,
})

export const login = (data) => ({
  type: LOGIN_USER,
  data,
})

export const register = (data) => ({
  type: REGISTER_USER,
  data,
})
