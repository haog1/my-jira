import styled from '@emotion/styled'
import { Spin } from 'antd'
import React from 'react'
export const PageLoading = () => {
  return (
    <FullPage className="page-loading">
      <Spin size={'large'} />
    </FullPage>
  )
}

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
