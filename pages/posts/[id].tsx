export default function Board({ data }: { data: any }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const data = await fetch(
    `http://localhost:3000/api/boards/${params.id}`,
  ).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch(`http://localhost:3000/api/boards`).then((res) =>
    res.json(),
  );
  const paths = data.map((board: any) => ({
    params: { id: board.id.toString() },
  }));
  return { paths, fallback: true };
}
