import axios from 'axios'
import GlobalApi, { baseURL } from '@/app/api/GlobalApi'

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
})

// Add a request interceptor to set the Authorization header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// extend  the life of the access token with the refresh token

Axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    let originRequest = error.config

    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true

      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken)

        if (newAccessToken) {
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return Axios(originRequest)
        }
      }
    }

    return Promise.reject(error)
  }
)

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...GlobalApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    const accessToken = response.data.accessToken
    localStorage.setItem('accessToken', accessToken)
    return accessToken
  } catch (error) {
    console.log(error)
  }
}

export default Axios
