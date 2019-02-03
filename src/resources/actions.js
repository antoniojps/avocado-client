
import { fetch, destroy } from 'utilities/requests'

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

export const deleteResource = id => ({
  type: 'DELETE_RESOURCES',
  payload: {
    id,
    url: 'resource/',
  },
  callFunction: destroy,
  context: 'RESOURCES',
})
