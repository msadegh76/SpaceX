import { Optional } from "@/app/lib/types";
import clsx from "clsx";
import { ReactElement } from "react";

interface PaginationProps {
  handleClick: (page: number) => void;
  prevPage: Optional<number>;
  hasPrevPage: boolean;
  nextPage: Optional<number>;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
}

export default function Pagination({
  handleClick,
  prevPage,
  hasPrevPage,
  nextPage,
  hasNextPage,
  page,
  totalPages,
}: PaginationProps): ReactElement {
  return (
    <div className="mt-3 flex align-middle justify-center flex-wrap">
      <button
        onClick={prevPage !== null ? () => handleClick(prevPage) : undefined}
        className={clsx(
          "p-2 rounded-md mx-1 size-8 flex items-center justify-center cursor-pointer mt-1",
          {
            "bg-gray-800": hasPrevPage,
            "bg-black-500": !hasPrevPage,
          }
        )}
      >
        {"<"}
      </button>

      {Array.from({ length: totalPages ?? 1 }).map((_, i) => (
        <button
          onClick={() => handleClick(i + 1)}
          key={i}
          className={clsx(
            "p-2 rounded-md mx-1 size-8 flex items-center justify-center cursor-pointer mt-1",
            {
              "bg-gray-800": page - 1 !== i,
              "bg-blue-500": page - 1 === i,
            }
          )}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={nextPage !== null ? () => handleClick(nextPage) : undefined}
        className={clsx(
          "p-2 rounded-md mx-1 size-8 flex items-center justify-center cursor-pointer mt-1",
          {
            "bg-gray-800": hasNextPage,
            "bg-black-500": !hasNextPage,
          }
        )}
      >
        {">"}
      </button>
    </div>
  );
}
