export const REQUEST_TENANT = 'REQUEST_TENANT'
export const REQUEST_TENANT_SUCCESS = 'REQUEST_TENANT_SUCCESS'
export const REQUEST_TENANT_FAILURE = 'REQUEST_TENANT_FAILURE'
export const REQUEST_TENANT_LOADING = 'REQUEST_TENANT_LOADING'

export const PUT_TENANT = 'PUT_TENANT'
export const PUT_TENANT_SUCCESS = 'PUT_TENANT_SUCCESS'
export const PUT_TENANT_FAILURE = 'PUT_TENANT_FAILURE'
export const PUT_TENANT_LOADING = 'PUT_TENANT_LOADING'

export const getTenant = () => ({
  type: REQUEST_TENANT,
})

export const putTenant = tenant => ({
  type: PUT_TENANT,
  payload: tenant,
})
