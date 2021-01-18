import React from "react";

import { LoginPage } from "./pages/login";
import { useAuth } from "context/auth";
import { DashboardPage } from "pages/dashboard";

import "./App.css";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <DashboardPage /> : <LoginPage />}</div>;
}

export default App;
