import { AuthForm } from 'context/auth'
import { User } from 'pages/project-list/search-panel'
import { api } from 'utils/api'
const apiUrl = api.baseUrl
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: AuthForm) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: AuthForm) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async response => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
