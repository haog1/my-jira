import React from 'react'

import { ErrorBoundary } from 'components/error-boundary'
import { PageError } from 'components/page-error'
import { useAuth } from 'context/auth'
import { DashboardPage } from 'pages/dashboard'

import { LoginPage } from './pages/login'

import './App.css'
function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={PageError}>
        {user ? <DashboardPage /> : <LoginPage />}
      </ErrorBoundary>
    </div>
  )
}

export default App
