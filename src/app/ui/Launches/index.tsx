"use client";
import { ReactElement } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Loading from "../Loading";
import useError from "@/app/lib/hooks/useError";
import Search from "../Search";
import { LaunchesData } from "@/app/lib/types";
import { fetchLaunches } from "@/app/api";
import Pagination from "../Pagination";
import LaunchTable from "../LaunchTable";
export default function Launches(): ReactElement {
  const [data, setData] = useState<LaunchesData>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { throwError, errorComponent } = useError();

  const updateUrl = useCallback(
    (newUrlParams: URLSearchParams) => {
      replace(`${pathname}?${newUrlParams.toString()}`);
    },
    [pathname, replace]
  );
  const fetchList = useCallback(
    async ({ page = 1, query = "" }: { page?: number; query?: string }) => {
      const response = await fetchLaunches({ page, query })
        .then((data) => {
          setData(data);
          return data;
        })
        .catch(throwError as never);
      return response;
    },
    [throwError]
  );

  const handleGetPage = useCallback(
    async (page?: number) => {
      const urlParams = new URLSearchParams(searchParams);
      const pageInUrl = urlParams.get("page");
      const pageToSet = page ?? (pageInUrl !== null ? Number(pageInUrl) : 1);
      const queryToSet = urlParams.get("query") ?? "";

      fetchList({
        page: pageToSet,
        query: queryToSet,
      }).then(() => {
        urlParams.set("page", pageToSet.toString());
        updateUrl(urlParams);
      });
    },
    [fetchList, updateUrl, searchParams]
  );

  useEffect(() => {
    if (data === undefined) void handleGetPage();
  }, [handleGetPage, data]);

  if (errorComponent !== undefined) return errorComponent;
  if (data === undefined) return <Loading />;

  const {
    page,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    docs,
  } = data;

  return (
    <>
      {" "}
      <main>
        <Search
          fetchList={fetchList}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <div className="container mx-auto">
          <div className="py-4 px-2 bg-gray-500">
            <div className={"flex flex-col w-full"}>
              <LaunchTable launches={docs} />
              <Pagination
                handleClick={handleGetPage}
                prevPage={prevPage}
                hasPrevPage={hasPrevPage}
                nextPage={nextPage}
                hasNextPage={hasNextPage}
                page={page}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
