import qs from 'qs'
import { api } from './api'
import * as auth from 'utils/auth-provider'
import { useAuth } from 'context/auth'

interface HttpRequestConfig extends RequestInit {
  data?: object
  token?: string
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpRequestConfig = {},
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  console.log(endpoint, config)

  return window
    .fetch(`${api.baseUrl}/${endpoint}`, config)
    .then(async res => {
      if (res.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({ message: 'Please sign in' })
      } else {
        const data = await res.json()
        if (res.ok) {
          return data
        }
        return Promise.reject(data)
      }
    })
    .catch(err => {})
}

export const useHttp = () => {
  const { user } = useAuth()

  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}