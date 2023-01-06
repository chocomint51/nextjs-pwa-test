import Link from "next/link";
import styled from "styled-components";

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const BoardsTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

// rounded border and shadow
// hover effect
// title and content are not aligned
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 50rem;
  height: 100px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  // cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
  h1 {
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    color: #111;
    &:hover {
      text-shadow: -1px 0 pink, 0 1px pink, 1px 0 pink, 0 -1px pink;
    }
  }
  p {
    font-size: 15px;
    font-weight: 400;
  }
`;

export default function Boards({ data }: any) {
  return (
    <BoardsContainer>
      <BoardsTitle>Posts</BoardsTitle>
      <div>
        {data.length !== 0 ? (
          data.map((board: any) => (
            <BoardContainer key={board._id}>
              <Link
                href={`/posts/${board._id}`}
                style={{ textDecoration: "none" }}
              >
                <h1>{board.title}</h1>
              </Link>
              <p>{board.content}</p>
            </BoardContainer>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </BoardsContainer>
  );
}

export async function getServerSideProps() {
  const PROD_API = process.env.PROD_API;
  const DEV_API = process.env.DEV_API;
  const api = process.env.NODE_ENV === "production" ? PROD_API : DEV_API;
  const data = await fetch(`${api}/boards`).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}
