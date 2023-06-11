import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://json-test-nine.vercel.app/projects'
})
// baseURL: 'http://localhost:5000/projects'