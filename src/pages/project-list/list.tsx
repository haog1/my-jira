import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

import { User } from "pages/project-list/search-panel";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  users: User[];
  list: Project[];
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Department",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Person",
          render(val, person) {
            return (
              <span>
                {users.find((user) => user.id === person.personId)?.name ||
                  "Unknown"}
              </span>
            );
          },
        },
        {
          title: "Date Created",
          render(val, task) {
            return (
              <span>
                {task.created ? dayjs(task.created).format("DD/MM/YYYY") : ""}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};
