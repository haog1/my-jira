import { Form, Input } from 'antd'
import React from 'react'

import { useAuth } from 'context/auth'

import { LongButton } from '.'

export const RegisterPanel = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { register } = useAuth()

  const handleSubmit = async ({
    passwordConfirmation,
    ...values
  }: {
    username: string
    password: string
    passwordConfirmation: string
  }) => {
    if (passwordConfirmation !== values.password) {
      onError(new Error('Passwords do not match'))
      return
    }
    try {
      await register(values)
    } catch (err) {
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
      <Form.Item
        name="passwordConfirmation"
        rules={[{ required: true, message: 'Password confirmation required' }]}
      >
        <Input
          placeholder={'Password Confirmation'}
          type="password"
          id={'passwordConfirmation'}
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type="primary">
          Register
        </LongButton>
      </Form.Item>
    </Form>
  )
}
