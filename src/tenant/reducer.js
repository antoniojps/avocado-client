import {
  REQUEST_TENANT_LOADING,
  REQUEST_TENANT_SUCCESS,
  REQUEST_TENANT_FAILURE,

  REQUEST_ROLES_LOADING,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ROLES_FAILURE,

  PUT_TENANT_LOADING,
  PUT_TENANT_SUCCESS,
  PUT_TENANT_FAILURE,

  PUT_ROLE_LOADING,
  PUT_ROLE_SUCCESS,
  PUT_ROLE_FAILURE,

  POST_ROLE_LOADING,
  POST_ROLE_SUCCESS,
  POST_ROLE_FAILURE,

  DELETE_ROLE_LOADING,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,

} from './actions'

const initialState = {
  tenant: null,
  tenantLoading: false,
  tenantFailure: false,
  tenantPutLoading: false,
  tenantPutFailure: false,
  permissions: null,
  roles: null,
  tenantRolesLoading: false,
  tenantRolesFailure: false,
  rolePutLoading: false,
  rolePutFailure: false,
  roleDeleteLoading: false,
  roleDeleteFailure: false,
}

export default function (state = initialState, action) {
  const { type, data } = action
  switch (type) {
  case REQUEST_TENANT_LOADING:
    return {
      ...state,
      tenant: null,
      tenantLoading: true,
      tenantFailure: false,
    }
  case REQUEST_TENANT_SUCCESS:
    return {
      ...state,
      tenant: data.tenant,
      tenantLoading: false,
      tenantFailure: false,
    }
  case REQUEST_TENANT_FAILURE:
    return {
      ...state,
      tenant: null,
      tenantLoading: false,
      tenantFailure: data,
    }
  case REQUEST_ROLES_LOADING:
    return {
      ...state,
      permissions: null,
      roles: null,
      tenantRolesLoading: true,
      tenantRolesFailure: false,
    }
  case REQUEST_ROLES_SUCCESS:
    return {
      ...state,
      roles: data.roles,
      permissions: data.permissions,
      tenantRolesLoading: false,
      tenantRolesFailure: false,
    }
  case REQUEST_ROLES_FAILURE:
    return {
      ...state,
      permissions: null,
      roles: null,
      tenantRolesLoading: false,
      tenantRolesFailure: data,
    }
  case PUT_TENANT_LOADING:
    return {
      ...state,
      tenantPutLoading: true,
    }
  case PUT_TENANT_SUCCESS:
    return {
      ...state,
      tenantPutLoading: false,
      tenant: data.tenant,
    }
  case PUT_TENANT_FAILURE:
    return {
      ...state,
      tenantPutLoading: false,
      tenantFailure: data.response,
    }
  case PUT_ROLE_LOADING:
    return {
      ...state,
      rolePutLoading: true,
    }
  case PUT_ROLE_SUCCESS:
    return {
      ...state,
      rolePutLoading: false,
      roles: state.roles.map(role => (role.id === data.role.id ? data.role : role)),
    }
  case PUT_ROLE_FAILURE:
    return {
      ...state,
      rolePutLoading: false,
      rolePutFailure: data.response,
    }
  case POST_ROLE_LOADING:
    return {
      ...state,
      rolePostLoading: true,
    }
  case POST_ROLE_SUCCESS:
    return {
      ...state,
      rolePostLoading: false,
      roles: [...state.roles, data.role],
    }
  case POST_ROLE_FAILURE:
    return {
      ...state,
      rolePostLoading: false,
      rolePostFailure: data.response,
    }
  case DELETE_ROLE_LOADING:
    return {
      ...state,
      roleDeleteLoading: true,
    }
  case DELETE_ROLE_SUCCESS:
    return {
      ...state,
      roleDeleteLoading: false,
      roles: state.roles.filter(({ id }) => id !== +data.id),

    }
  case DELETE_ROLE_FAILURE:
    return {
      ...state,
      roleDeleteLoading: false,
      roleDeleteFailure: data.response,
    }
  default:
    return state
  }
}
