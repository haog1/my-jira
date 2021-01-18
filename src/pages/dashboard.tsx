import React from "react";

import { useAuth } from "context/auth";

import { ProjectListPage } from "./project-list";

export const DashboardPage = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProjectListPage />
    </div>
  );
};
