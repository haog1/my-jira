import { useEffect, useState } from 'react'

export const useArray = <T>(arr: T[]) => {
  const [value, setValue] = useState(arr)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
  }
}

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

export interface State<T> {
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
      data: null,
      status: 'error',
      error,
    })

  // Trigger async request
  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error('Not Promise Type')
    }

    // Set as loading status
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
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    run,
    setData,
    setError,
    ...state,
  }
}
