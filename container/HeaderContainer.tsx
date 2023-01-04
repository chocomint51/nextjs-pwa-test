import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

export const Header = styled.div`
  display: flex;
  height: 80px;
  background-color: #f5f5f5;
`;

export const Tabs = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #f5f5f5;
`;

export const Tab = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: #f5f5f5;
  cursor: pointer;
  text-decoration: none;
  color: #111;
  font-size: 20px;
  font-weight: 600;
  &:hover {
    background-color: #e5e5e5;
  }
  &.active {
    text-shadow: -1px 0 pink, 0 1px pink, 1px 0 pink, 0 -1px pink;
    background-color: #e5e5e5;
  }
`;

export default function HeaderContainer() {
  const router = useRouter();
  return (
    <Header>
      <Tabs>
        <Tab href={"/"} className={router.pathname == "/" ? "active" : ""}>
          home
        </Tab>
        <Tab
          href={"/posts"}
          className={router.pathname == "/posts" ? "active" : ""}
        >
          posts
        </Tab>
        <Tab
          href={"/posts/write"}
          className={router.pathname == "/posts/write" ? "active" : ""}
        >
          write
        </Tab>
      </Tabs>
    </Header>
  );
}
