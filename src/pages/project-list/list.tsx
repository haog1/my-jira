import { Table } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

import { User } from 'pages/project-list/search-panel'
import { Project } from '.'
import { TableProps } from 'antd/lib/table'

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'organization',
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    },
    {
      title: 'Person',
      render(value: string, task: Project) {
        return (
          <span>
            {users.find(user => user.id === task.personId)?.name || 'Unknown'}
          </span>
        )
      },
    },
    {
      title: 'Date Created',
      render(value: string, task: Project) {
        return (
          <span>
            {task.created ? dayjs(task.created).format('DD/MM/YYYY') : ''}
          </span>
        )
      },
    },
  ]
  return <Table rowKey={'id'} pagination={false} columns={columns} {...props} />
}
