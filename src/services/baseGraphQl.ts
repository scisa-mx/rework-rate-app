const { VITE_API_URL } = import.meta.env
import axios from 'axios'

const graphqlClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

graphqlClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('GraphQL Error:', error.response?.data || error.message)
    // TODO : Manejar errores de GraphQL de manera más específica
    return Promise.reject(error)
  },
)

export const executeQuery = async (query: string, variables?: object) => {
  const response = await graphqlClient.post('', {
    query,
    variables,
  })
  return response.data
}
