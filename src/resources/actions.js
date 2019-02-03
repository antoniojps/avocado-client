
import {
  fetch, destroy, post, put,
} from 'utilities/requests'

export const getResources = ({ search = '', page = 1, reset = false }) => ({
  type: 'FETCH_RESOURCES',
  payload: {
    search,
    page,
    url: 'resource',
    reset,
  },
  callFunction: fetch,
  context: 'RESOURCES',
})

export const postResource = data => ({
  type: 'POST_RESOURCES',
  payload: {
    data,
    url: 'resource',
  },
  callFunction: post,
  context: 'RESOURCES',
})

export const putResource = data => ({
  type: 'PUT_RESOURCES',
  payload: {
    data,
    url: 'resource',
    id: data.id,
  },
  callFunction: put,
  context: 'RESOURCES',
})

export const deleteResource = id => ({
  type: 'DELETE_RESOURCES',
  payload: {
    id,
    url: 'resource/',
  },
  callFunction: destroy,
  context: 'RESOURCES',
})
