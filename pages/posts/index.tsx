import Link from "next/link";

export default function Boards({ data }: { data: any }) {
  console.log(data);
  return (
    <div>
      <h1>Boards</h1>
      <div>
        {data
          ? data.map((board: any) => (
              <div key={board.id}>
                <Link
                  href={`/posts/${board.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <h1>{board.title}</h1>
                </Link>
                <p>{board.content}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch("http://localhost:3000/api/boards").then((res) =>
    res.json(),
  );
  return {
    props: {
      data,
    },
  };
}
