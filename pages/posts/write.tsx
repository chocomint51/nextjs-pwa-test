import { useRouter } from "next/router";
import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/boards", {
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
      <h1>Write</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
}
