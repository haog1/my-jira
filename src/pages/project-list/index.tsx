import * as qs from "qs";
import React, { useEffect, useState } from "react";

import { cleanObject } from "utils/cleaner";

import { api } from "../../utils/api";
import { useDebounce, useMount } from "../../utils/hooks";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(
      `${api.baseUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debouncedParam]); // Take effect when param changes

  useMount(() => {
    fetch(`${api.baseUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
