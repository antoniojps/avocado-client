export const REQUEST_TENANT = 'REQUEST_TENANT'
export const REQUEST_TENANT_SUCCESS = 'REQUEST_TENANT_SUCCESS'
export const REQUEST_TENANT_FAILURE = 'REQUEST_TENANT_FAILURE'
export const REQUEST_TENANT_LOADING = 'REQUEST_TENANT_LOADING'

export const PUT_TENANT = 'PUT_TENANT'
export const PUT_TENANT_SUCCESS = 'PUT_TENANT_SUCCESS'
export const PUT_TENANT_FAILURE = 'PUT_TENANT_FAILURE'
export const PUT_TENANT_LOADING = 'PUT_TENANT_LOADING'

export const REQUEST_ROLES = 'REQUEST_ROLES'
export const REQUEST_ROLES_SUCCESS = 'REQUEST_ROLES_SUCCESS'
export const REQUEST_ROLES_FAILURE = 'REQUEST_ROLES_FAILURE'
export const REQUEST_ROLES_LOADING = 'REQUEST_ROLES_LOADING'

export const PUT_ROLE = 'PUT_ROLE'
export const PUT_ROLE_SUCCESS = 'PUT_ROLE_SUCCESS'
export const PUT_ROLE_FAILURE = 'PUT_ROLE_FAILURE'
export const PUT_ROLE_LOADING = 'PUT_ROLE_LOADING'

export const getTenant = () => ({
  type: REQUEST_TENANT,
})
export const getRoles = () => ({
  type: REQUEST_ROLES,
})

export const putTenant = tenant => ({
  type: PUT_TENANT,
  payload: tenant,
})

export const putRole = ({ id, permissions }) => ({
  type: PUT_ROLE,
  payload: {
    id,
    permissions,
  },
})
