import axios from 'axios'

const API = axios.create({
	baseURL: 'http://localhost:9090/api',
})

export const explainApi = async (payload) => {
	const response = await API.post('/explain', payload)
	return response.data
}