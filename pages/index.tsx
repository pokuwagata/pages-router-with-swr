import useSWR, { SWRConfig } from "swr";

function Component1() {
  const { data, error, isLoading } = useSWR("/api/hello");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // データをレンダリングする
  return <div className="bg-slate-400">hello {data.name}!</div>;
}

function Component2() {
  const { data, error, isLoading } = useSWR("/api/hello");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // データをレンダリングする
  return <div className="bg-slate-600">hello {data.name}!</div>;
}

function Button() {
  const { mutate } = useSWR("/api/hello");
  return (
    <button
      onClick={() => {
        mutate({ name: "foo" }, { revalidate: true });
      }}
    >
      click
    </button>
  );
}

export default function Home() {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string, init: RequestInit) =>
          fetch(url, init).then((res) => res.json()),
      }}
    >
      <Component1 />
      <Component2 />
      <Button />
    </SWRConfig>
  );
}
