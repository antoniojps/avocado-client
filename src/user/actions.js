export const UPDATE_GATHER_REDIRECT = 'UPDATE_GATHER_REDIRECT'

export function updateGatherRedirect(url) {
  let path = url
  // prevent looping to /gather
  if (url === '/gather') path = '/'
  return {
    type: UPDATE_GATHER_REDIRECT,
    data: path,
  }
}
