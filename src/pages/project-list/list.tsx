import React from "react";

import { User } from "pages/project-list/search-panel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Person</th>
        </tr>
      </thead>
      <tbody>
        {list.map((task) => (
          <tr key={task.id}>
            <td>{task.name}</td>
            <td>
              {users.find((user) => user.id === task.personId)?.name ||
                "Unkonwn"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
