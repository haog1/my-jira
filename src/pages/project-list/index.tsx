import styled from '@emotion/styled'
import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'

import { cleanObject } from 'utils/cleaner'
import { useHttp } from 'utils/http'
import { useAsync, useDebounce, useMount } from '../../utils/hooks'
import { List } from './list'
import { SearchPanel } from './search-panel'

export interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: number
}

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const { run, isLoading, error, data: tasks } = useAsync<Project[]>()
  const client = useHttp()
  const debouncedParam = useDebounce(param, 200)
  const [users, setUsers] = useState([])

  useEffect(() => {
    run(client('projects', { data: cleanObject(debouncedParam) }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]) // Take effect when param changes

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <h1>Results</h1>
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={tasks || []} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
