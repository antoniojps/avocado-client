import ax from 'axios'
import { getApiUrl } from 'utilities'

const axios = ax.create({
  baseURL: `${getApiUrl()}`,
})

export const queryCurrentTenant = () => axios.get('/tenant');
export const queryDomainAlreadyExists = fqdn => axios.post('/checkDomain', {
  fqdn,
})

// fqdn is the subdomain
export const createTenant = ({
  name,
  email,
  password,
  password_confirmation, // eslint-disable-line
  fqdn,
}) => axios.post('/tenant', {
  name,
  email,
  password,
  password_confirmation,
  fqdn,
})
