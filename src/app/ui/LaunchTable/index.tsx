import { Launch } from "@/app/lib/types";
import { utcToLocaleTime } from "@/app/lib/utils";
import Link from "next/link";
import { ReactElement } from "react";

interface LaunchTableProps {
  launches: Launch[];
}
export default function LaunchTable({
  launches,
}: LaunchTableProps): ReactElement {
  return (
    <table className={""}>
      <thead>
        <tr className="bg-black py-1 px-2 font-bold">
          <th>Name</th>
          <th className={"w-48"}>Date</th>
          <th>Details</th>
          <th>More</th>
        </tr>
      </thead>

      <tbody>
        {launches.map((launch) => {
          const { name, date_utc, details, id } = launch;
          return (
            <tr
              key={name}
              className="border-b bg-black py-1 px-2 mt-2 shadow-black shadow-sm rounded-md"
            >
              <td className="text-center">{name}</td>
              <td className="text-center">{utcToLocaleTime(date_utc)}</td>
              <td className="whitespace-break-spaces">{details}</td>
              <td className="text-center">
                <Link href={`/launch/${id}`} key={id}>
                  Open {">"}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
