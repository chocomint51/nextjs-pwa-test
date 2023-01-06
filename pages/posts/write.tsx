import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  width: 50rem;
  height: 3rem;
  margin: 1rem;
  padding: 0.5rem;
  border: 1px solid #111;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 50rem;
  height: 10rem;
  margin: 1rem;
  padding: 0.5rem;
  border: 1px solid #111;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  width: 50rem;
  height: 3rem;
  margin: 1rem;
  padding: 0.5rem;
  border: 1px solid #111;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #111;
    color: #fff;
  }
`;

export default function Write({ api }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${api}/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle("");
    setContent("");
    router.push("/posts");
  };

  return (
    <div>
      <Title>Write</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">작성하기</Button>
      </Form>
    </div>
  );
}

export async function getServerSideProps() {
  const PROD_API = process.env.PROD_API;
  const DEV_API = process.env.DEV_API;
  const api = process.env.NODE_ENV === "production" ? PROD_API : DEV_API;
  return {
    props: { api },
  };
}
