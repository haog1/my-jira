import React, { ReactNode } from 'react'
type FallBackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallBackRender }>,
  { error: Error | null }
> {
  state = { error: null }

  // Assigning the actual error to state
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { children, fallbackRender } = this.props

    if (error) {
      return fallbackRender({ error })
    }

    return children
  }
}
