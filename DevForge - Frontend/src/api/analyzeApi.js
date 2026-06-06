import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:9090/api',
})

export const analyzeProjectApi = async (payload) => {
  const response = await API.post('/analyze', payload)
  return response.data
}

export const analyzeZipApi = async (file) => {

  const formData = new FormData()

  formData.append('file', file)

  const response = await API.post(
    '/analyzeZip',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}