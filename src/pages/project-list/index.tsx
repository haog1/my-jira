import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import { cleanObject } from "utils/cleaner";
import { useHttp } from "utils/http";

import { useDebounce, useMount } from "../../utils/hooks";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
export const ProjectListPage = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const client = useHttp();

  const debouncedParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]); // Take effect when param changes

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <h1>Results</h1>
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
