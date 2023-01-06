import Link from "next/link";

export default function Boards({ data }: any) {
  return (
    <div>
      <h1>Boards</h1>
      <div>
        {data.length !== 0 ? (
          data.map((board: any) => (
            <div key={board._id}>
              <Link
                href={`/posts/${board._id}`}
                style={{ textDecoration: "none" }}
              >
                <h1>{board.title}</h1>
              </Link>
              <p>{board.content}</p>
            </div>
          ))
        ) : (
          <p>No posts</p>
        )}
      </div>
    </div>
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
