
import { fetch } from 'utilities/requests'

export const getUsers = ({ search = '', page = 1, reset = false }) => ({
  type: 'FETCH_USERS',
  payload: {
    search,
    page,
    url: 'users',
    reset,
  },
  callFunction: fetch,
  counterName: 'USERS',
})
