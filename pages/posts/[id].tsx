export default function Board({ data }: { data: any }) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
    </div>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const PROD_API = process.env.PROD_API;
  const DEV_API = process.env.DEV_API;
  const api = process.env.NODE_ENV === "production" ? PROD_API : DEV_API;
  const data = await fetch(`${api}/${params.id}`).then((res) => res.json());
  return {
    props: {
      data,
    },
  };
}
