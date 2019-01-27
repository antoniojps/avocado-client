

import { HTTP_PROTOCOL, API_URL_BASE, ENDPOINT } from 'config';

export const getTenant = () => {
  const splittedDomain = window.location.hostname.split('.')
  return splittedDomain.length === 3 && `${splittedDomain[0]}`
}

export const getApiUrl = () => {
  const tenant = getTenant()
  if (!tenant) {
    return ENDPOINT
  }
  return `${HTTP_PROTOCOL}${tenant}.${API_URL_BASE}`
}
