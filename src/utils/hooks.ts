import { Task } from 'pages/project-list'
import { User } from 'pages/project-list/search-panel'
import { useEffect, useState } from 'react'
import { api } from './api'
import { cleanObject } from './cleaner'
import { useHttp } from './http'

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

interface State<T> {
  error: Error | null
  data: T | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
}

export const useAsync = <T>(initialState?: State<T>) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  })

  const setData = (data: T) =>
    setState({
      data,
      status: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      status: 'error',
      data: null,
    })

  // run 用来触发异步请求
  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setState({ ...state, status: 'loading' })
    return promise
      .then(data => {
        setData(data)
        return data
      })
      .catch(error => {
        setError(error)
        return error
      })
  }

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state,
  }
}

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Task[]>()

  useEffect(() => {
    run(client(api.projectsEndpoint, { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client(api.usersEndpoint, { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}
