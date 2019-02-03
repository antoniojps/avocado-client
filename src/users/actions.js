import {
  fetch, destroy, put,
} from 'utilities/requests'

export const getUsers = ({ search = '', page = 1, reset = false }) => ({
  type: 'FETCH_USERS',
  payload: {
    search,
    page,
    url: 'users',
    reset,
  },
  callFunction: fetch,
  context: 'USERS',
})

// export const postUser = data => ({
//   type: 'POST_USERS',
//   payload: {
//     data,
//     url: 'invite',
//   },
//   callFunction: post,
//   context: 'USERS',
// })

export const putUser = data => ({
  type: 'PUT_USERS',
  payload: {
    data,
    url: 'users',
    id: data.id,
  },
  callFunction: put,
  context: 'USERS',
})

export const deleteUser = id => ({
  type: 'DELETE_USERS',
  payload: {
    id,
    url: 'users/',
  },
  callFunction: destroy,
  context: 'USERS',
})
