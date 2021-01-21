import { Form, Input } from 'antd'
import React from 'react'

import { useAuth } from 'context/auth'
import { useAsync } from 'utils/hooks'

import { LongButton } from '.'
export const LoginPanel = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync()

  const handleSubmit = async (values: {
    username: string
    password: string
  }) => {
    try {
      await run(login(values))
    } catch (err) {
      console.log(err)
      onError(err)
    }
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
        <LongButton loading={isLoading} htmlType={'submit'} type="primary">
          Login
        </LongButton>
      </Form.Item>
    </Form>
  )
}
