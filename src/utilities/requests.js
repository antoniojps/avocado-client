import ax from 'axios'
import { getApiUrl } from 'utilities'

const axios = ax.create({
  baseURL: `${getApiUrl()}`,
})
export const queryCurrentTenant = () => axios.get('/tenant');
export const queryCurrentTenantRoles = () => axios.get('/roles');
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
