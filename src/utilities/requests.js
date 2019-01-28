import ax from 'axios'
import { getApiUrl } from 'utilities'

const axios = ax.create({
  baseURL: `${getApiUrl()}`,
})

export const queryCurrentTenant = () => axios.get('/tenant');
