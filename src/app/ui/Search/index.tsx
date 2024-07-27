import { LaunchesData } from "@/app/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
  fetchList: ({
    query,
    page,
  }: {
    query?: string;
    page?: number;
  }) => Promise<LaunchesData>;
  defaultValue?: string;
}
export default function Search({
  fetchList,
  defaultValue,
}: SearchProps): ReactElement {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateUrl = useCallback(
    (newUrlParams: URLSearchParams) => {
      replace(`${pathname}?${newUrlParams.toString()}`);
    },
    [pathname, replace]
  );

  const handleSearch = useDebouncedCallback((query) => {
    fetchList({ query }).then((response) => {
      if (query) {
        urlParams.set("query", query);
      } else {
        urlParams.delete("query");
      }
      if (String(response.page) !== urlParams.get("page")) {
        urlParams.set("page", response.page.toString());
      }
      updateUrl(urlParams);
    });
  }, 500);

  return (
    <input
      type="search"
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search launch..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={defaultValue}
    />
  );
}
