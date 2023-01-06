export default function Board({ data }: { data: any }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const data = await fetch(
    `http://localhost:3000/api/boards/${params.id}`,
  ).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}
