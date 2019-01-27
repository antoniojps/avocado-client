import {
  REQUEST_TENANT_LOADING,
  REQUEST_TENANT_SUCCESS,
  REQUEST_TENANT_FAILURE,

} from './actions'

const initialState = {
  tenant: null,
  tenantLoading: false,
  tenantError: null,
}

export default function (state = initialState, action) {
  const { type, data } = action
  switch (type) {
  case REQUEST_TENANT_LOADING:
    return {
      ...state,
      tenantLoading: true,
    }
  case REQUEST_TENANT_SUCCESS:
    return {
      ...state,
      tenant: data,
      tenantLoading: false,
    }
  case REQUEST_TENANT_FAILURE:
    return {
      ...state,
      tenant: null,
      tenantError: data,
      tenantLoading: false,
    }
  default:
    return state
  }
}
