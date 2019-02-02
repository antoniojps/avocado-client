
import { fetch } from 'utilities/requests'

export const getUnits = ({ search = '', page = 1 }) => ({
  type: 'FETCH_UNITS',
  payload: {
    search,
    page,
    url: 'unit',
  },
  callFunction: fetch,
  counterName: 'UNITS',
})
