import ax from 'axios'
import { getApiUrl } from 'utilities'

const axios = ax.create({
  baseURL: `${getApiUrl()}`,
})

export const queryCurrentTenant = () => axios.get('/tenant');

// fqdn is the subdomain
export const createTenant = ({
  name,
  email,
  password,
  passwordConfirmation,
  fqdn,
}) => axios.post('/tenant', {
  name,
  email,
  password,
  password_confirmation: passwordConfirmation,
  fqdn,
})
