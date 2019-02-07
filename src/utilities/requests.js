import ax from 'axios'
import { getApiUrl, getToken } from 'utilities'

function setupConfig() {
  const config = {
    baseURL: `${getApiUrl()}`,
  }

  const token = getToken()
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    }
  }
  return config
}

// needs to be invoked before use get the updated token
// example: axiosWithAuth().get('/endpoint)
// this way setupConfig is invoked before the request and gets updated
export const axiosWithAuth = () => ax.create(setupConfig())

// without auth header just use
export const axios = ax.create(setupConfig())

export const queryCurrentTenant = () => axiosWithAuth().get('/tenant')
export const queryDomainAlreadyExists = fqdn => axiosWithAuth().post('/checkDomain', {
  fqdn,
})
export const queryPutTenant = ({
  name, description, themes_id, logo,// eslint-disable-line
}) => axiosWithAuth().put('/tenant', {
  name,
  description,
  themes_id,
  logo,
}, {
  Headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
})

export const queryDeleteTenant = () => axiosWithAuth().delete('tenant')

// fqdn is the subdomain
export const createTenant = ({
  company,
  name,
  email,
  password,
  password_confirmation, // eslint-disable-line
  fqdn,
}) => axiosWithAuth().post('/tenant', {
  company,
  name,
  email,
  password,
  password_confirmation,
  fqdn,
})

export const inviteUser = ({ name, email, role }) => axiosWithAuth().post('/invite', { name, email, role })

export const queryCurrentTenantRoles = () => axiosWithAuth().get('/roles')
export const queryPostRole = name => axiosWithAuth().post('/roles', { name })
export const queryPutRole = ({ id, permissions }) => axiosWithAuth().put(`/roles/${id}`, {
  permissions,
}, {
  Headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
})
export const queryDeleteRole = id => axiosWithAuth().delete(`/roles/${id}`)

export const login = ({ email, password }) => axiosWithAuth().post('/login', { email, password })
export const queryWarmup = () => axiosWithAuth().get('/warmup')

/** reusable */
export const fetch = ({ url, search, page }) => axiosWithAuth().get(url, {
  params: {
    page,
    search,
  },
})

export const post = ({ url, data }) => axiosWithAuth().post(url, data)

export const put = ({ url, data }) => axiosWithAuth().put(`${url}/${data.id}`, data)

export const destroy = ({ url, id }) => axiosWithAuth().delete(`${url}${id}`)

export const globalSearch = (search) => axiosWithAuth().get('/search', {
  params: {
    search,
  },
})

export const fetchEvents = search => axiosWithAuth().get('/event', {
  params: {
    ...search,
  },
})
export const fetchDataAddEvent = () => axiosWithAuth().get('/eventwarmup')

export const postEvent = (data) => axiosWithAuth().post('event', data)

export const putEvent = (data) => axiosWithAuth().put(`event/${data.id}`, data)
