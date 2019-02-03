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
const axiosWithAuth = () => ax.create(setupConfig())

// without auth header just use
export const axios = ax.create(setupConfig())

export const queryCurrentTenant = () => axios.get('/tenant');
export const queryDomainAlreadyExists = fqdn => axios.post('/checkDomain', {
  fqdn,
})
export const queryPutTenant = ({
  name, description, themes_id, logo,// eslint-disable-line
}) => axios.put('/tenant', {
  name,
  description,
  themes_id,
  logo,
}, {
  Headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
})

export const queryDeleteTenant = () => axios.delete('tenant');

// fqdn is the subdomain
export const createTenant = ({
  company,
  name,
  email,
  password,
  password_confirmation, // eslint-disable-line
  fqdn,
}) => axios.post('/tenant', {
  company,
  name,
  email,
  password,
  password_confirmation,
  fqdn,
})


export const queryCurrentTenantRoles = () => axios.get('/roles');
export const queryPostRole = name => axios.post('/roles', { name })
export const queryPutRole = ({ id, permissions }) => axios.put(`/roles/${id}`, {
  permissions,
}, {
  Headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
})
export const queryDeleteRole = id => axios.delete(`/roles/${id}`)

export const login = ({ email, password }) => axios.post('/login', { email, password })
export const queryWarmup = () => axiosWithAuth().get('/warmup')

/** reusable */
export const fetch = ({ url, search, page }) => axios.get(url, {
  params: {
    page,
    search,
  },
})

export const post = ({ url, data }) => axios.post(url, data);

export const put = ({ url, data }) => axios.put(`${url}/${data.id}`, data);

export const destroy = ({ url, id }) => axios.delete(`${url}${id}`);

export const globalSearch = (search) => axios.get('/search', {
  params: {
    search,
  },
})
