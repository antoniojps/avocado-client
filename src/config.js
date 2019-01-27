export const HTTP_PROTOCOL = 'http://';
export const ENDPOINT =  `${HTTP_PROTOCOL}api.avocado.pt` 
export const CLIENT_ORIGIN = process.env.NODE_ENV === 'production' ? `${HTTP_PROTOCOL}avocado.pt` : `${HTTP_PROTOCOL}avocado.local:3000`
export const API_URL_BASE = 'api.avocado.pt/api/v1'
