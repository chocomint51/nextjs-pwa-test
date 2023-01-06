import { useRouter } from "next/router";

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
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
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
