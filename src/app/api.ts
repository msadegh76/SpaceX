import { Launch, LaunchesData } from "./lib/types";

const BaseUrl = "https://api.spacexdata.com/v5";
export const getLaunch = async (id: string) => {
  const res = await fetch(`${BaseUrl}/launches/${id}`);
  return (await res.json()) as Launch;
};
export const fetchLaunches = async ({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) => {
  return fetch(`${BaseUrl}/launches/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        query.length === 0
          ? {}
          : {
              $text: {
                $search: query,
              },
            },
      options: { page: page },
    }),
  }).then((res) => res.json()) as Promise<LaunchesData>;
};
