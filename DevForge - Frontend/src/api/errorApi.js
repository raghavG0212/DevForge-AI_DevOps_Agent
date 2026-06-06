import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:9090/api',
})

export const analyzeErrorApi = async (payload) => {
  const response = await API.post('/error', payload)
  return response.data
}