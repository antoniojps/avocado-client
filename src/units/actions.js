import {
  fetch, destroy, post, put,
} from 'utilities/requests'


export const getUnits = ({ search = '', page = 1, reset = false }) => ({
  type: 'FETCH_UNITS',
  payload: {
    search,
    page,
    url: 'unit',
    reset,
  },
  callFunction: fetch,
  context: 'UNITS',
})

export const postUnit = data => ({
  type: 'POST_UNITS',
  payload: {
    data,
    url: 'unit',
  },
  callFunction: post,
  context: 'UNITS',
})

export const putUnit = data => ({
  type: 'PUT_UNITS',
  payload: {
    data,
    url: 'unit',
    id: data.id,
  },
  callFunction: put,
  context: 'UNITS',
})

export const deleteUnit = id => ({
  type: 'DELETE_UNITS',
  payload: {
    id,
    url: 'unit/',
  },
  callFunction: destroy,
  context: 'UNITS',
})
