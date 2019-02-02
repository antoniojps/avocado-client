
import { fetch } from 'utilities/requests'

export const getResources = ({ search = '', page = 1, reset = false }) => ({
  type: 'FETCH_RESOURCES',
  payload: {
    search,
    page,
    url: 'resource',
    reset,
  },
  callFunction: fetch,
  counterName: 'RESOURCES',
})
