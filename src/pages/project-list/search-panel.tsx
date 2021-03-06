import { Form, Input, Select } from 'antd'
import React from 'react'
export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout={'inline'}>
      <Form.Item>
        <Input
          placeholder="Search..."
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={''}>Select</Select.Option>
          {users.map(user => (
            <Select.Option key={user.id} value={user.id || ''}>
              {user.name || ''}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
