import { useRouter } from "next/router";
import styled from "styled-components";

// round border and shadow
// shadow follow the cursor
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
`;

const Content = styled.p`
  font-size: 30px;
  font-weight: 400;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #e5e5e5;
  cursor: pointer;
  &:hover {
    background-color: #d5d5d5;
  }
`;

export default function Board({ data, api }: any) {
  const router = useRouter();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${api}/boards/${data._id}`, {
      method: "DELETE",
    });
    router.push("/posts");
  };

  return (
    <Container>
      <Title>{data.title}</Title>
      <Content>{data.content}</Content>
      <Button onClick={handleDelete}>삭제하기</Button>
    </Container>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const PROD_API = process.env.PROD_API;
  const DEV_API = process.env.DEV_API;
  const api = process.env.NODE_ENV === "production" ? PROD_API : DEV_API;
  const data = await fetch(`${api}/boards/${params.id}`).then((res) =>
    res.json(),
  );
  return {
    props: {
      data: data[0],
      api,
    },
  };
}
