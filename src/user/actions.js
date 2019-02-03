export const UPDATE_GATHER_REDIRECT = 'UPDATE_GATHER_REDIRECT'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_LOADING = 'LOGIN_USER_LOADING'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

export function updateGatherRedirect(url) {
  let path = url
  // prevent looping to /gather
  if (url === '/gather') path = '/'
  return {
    type: UPDATE_GATHER_REDIRECT,
    data: path,
  }
}

export const login = (data) => ({
  type: LOGIN_USER,
  data,
})
