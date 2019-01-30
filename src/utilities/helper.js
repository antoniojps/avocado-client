

import { HTTP_PROTOCOL, API_URL_BASE, ENDPOINT } from 'config';

export const getTenant = () => {
  const splittedDomain = window.location.hostname.split('.')
  return splittedDomain.length === 3 && `${splittedDomain[0]}`
}

export const getMainUrl = () => {
  const { hostname, protocol, port } = window.location
  const splittedHost = hostname.split('.')
  const splittedMainHost = splittedHost.length === 3 ? splittedHost.slice(1) : splittedHost
  const mainHost = splittedMainHost.join('.')
  const mainPort = (port === '') ? '' : `:${port}`
  const mainUrl = `${protocol}//${mainHost}${mainPort}`
  return mainUrl
}

export const getApiUrl = () => {
  const tenant = getTenant()
  if (!tenant) {
    return ENDPOINT
  }
  return `${HTTP_PROTOCOL}${tenant}.${API_URL_BASE}`
}

export const callPropFunc = (func) => {
  if (typeof func === 'function') func()
}
