import ax from 'axios'
import { getApiUrl } from 'utilities'

const axios = ax.create({
  baseURL: getApiUrl(),
  timeout: 1000,
  withCredentials: true,
})

export const queryCurrentTenant = () => axios.get('/tenant');
