import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/projects'
})
// baseURL: 'http://localhost:5000/projects'
// "baseURL: 'https://json-test-nine.vercel.app/projects'"