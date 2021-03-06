import styled from '@emotion/styled'
import { Button, Card, Divider, Typography } from 'antd'
import React, { useState } from 'react'

import leftBg from 'assets/left-bg.svg'
import logo from 'assets/logo.svg'
import rightBg from 'assets/right-bg.svg'

import { LoginPanel } from './login'
import { RegisterPanel } from './register'
export const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  return (
    <Container className="container">
      <Header className="header" />
      <ShadowCard>
        <Title>{isRegister ? 'Register' : 'Sign In'}</Title>
        {error ? (
          <Typography.Text type={'danger'}>{error.message}</Typography.Text>
        ) : null}
        <div>
          {isRegister ? (
            <RegisterPanel onError={setError} />
          ) : (
            <LoginPanel onError={setError} />
          )}
          <Divider />
          <Button onClick={() => setIsRegister(!isRegister)}>
            Switch to {isRegister ? 'Login' : 'Register'}
          </Button>
        </div>
      </ShadowCard>
      <Background className="background" />
    </Container>
  )
}

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Background = styled.div`
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${leftBg}), url(${rightBg});
`

const Header = styled.header`
  padding: 5rem 0;
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ShadowCard = styled(Card)`
  z-index: 1;
  position: relative;
  padding: 3.2rem 4rem;
  width: 40rem;
  min-height: 56rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 1rem;
  text-align: center;
`
