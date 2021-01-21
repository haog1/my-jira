import { Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
import React from 'react'

import { FullPage } from './page-loading'
export const PageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    </FullPage>
  )
}
