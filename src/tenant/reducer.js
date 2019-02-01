import {
  REQUEST_TENANT_LOADING,
  REQUEST_TENANT_SUCCESS,
  REQUEST_TENANT_FAILURE,

  PUT_TENANT_LOADING,
  PUT_TENANT_SUCCESS,
  PUT_TENANT_FAILURE,

} from './actions'

const initialState = {
  tenant: null,
  tenantLoading: false,
  tenantFailure: false,
  tenantPutLoading: false,
  tenantPutFailure: false,
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
  case PUT_TENANT_LOADING:
    return { ...state, tenantPutLoading: true }
  case PUT_TENANT_SUCCESS:
    return { ...state, tenantPutLoading: false, tenant: data.tenant }
  case PUT_TENANT_FAILURE:
    return { ...state, tenantPutLoading: false, tenantFailure: data.response }
  default:
    return state
  }
}
