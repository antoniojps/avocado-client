export const HTTP_PROTOCOL = 'http://';
export const API_URL_BASE = 'api.avocado.pt/api/v1'
export const ENDPOINT = `${HTTP_PROTOCOL}${API_URL_BASE}`
export const CLIENT_ORIGIN = process.env.NODE_ENV === 'production' ? `${HTTP_PROTOCOL}avocado.pt` : `${HTTP_PROTOCOL}avocado.local:3000`
