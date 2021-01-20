import styled from '@emotion/styled'
import { Typography } from 'antd'
import React, { useState } from 'react'

import { useDebounce, useTasks, useUsers } from '../../utils/hooks'
import { List } from './list'
import { SearchPanel } from './search-panel'

export interface Task {
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
  const debouncedParam = useDebounce(param, 200)
  const { isLoading, error, data: tasks } = useTasks(debouncedParam)
  const { data: users } = useUsers()

  return (
    <Container>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
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
