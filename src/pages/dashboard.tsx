import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import React from "react";

import { ReactComponent as NavLogo } from "assets/nav-logo.svg";
import { Row } from "components/lib";
import { useAuth } from "context/auth";

import { ProjectListPage } from "./project-list";
export const DashboardPage = () => {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <NavLogo width={"18rem"} color={"rgb(28, 132, 255)"} />
          <h2>Tasks</h2>
          <h2>Users</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button type={"link"} onClick={logout}>
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListPage />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  z-index: 1;
  padding: 3.2rem;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
