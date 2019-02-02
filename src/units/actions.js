
import { fetch } from 'utilities/requests'

export const getUnits = ({ search = '', page = 1, reset = false }) => ({
  type: 'FETCH_UNITS',
  payload: {
    search,
    page,
    url: 'unit',
    reset,
  },
  callFunction: fetch,
  counterName: 'UNITS',
})
