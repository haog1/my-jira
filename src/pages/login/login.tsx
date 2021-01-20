import { Form, Input } from 'antd'
import React from 'react'

import { useAuth } from 'context/auth'

import { LongButton } from '.'
export const LoginPanel = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: 'Username required' }]}
      >
        <Input placeholder={'Username'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Password required' }]}
      >
        <Input placeholder={'Password'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type="primary">
          Login
        </LongButton>
      </Form.Item>
    </Form>
  )
}
