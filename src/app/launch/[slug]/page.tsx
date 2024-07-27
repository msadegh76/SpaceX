"use client";
import useError from "@/app/lib/hooks/useError";
import Loading from "@/app/ui/Loading";
import { utcToLocaleTime } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { Launch } from "@/app/lib/types";
import clsx from "clsx";
import { getLaunch } from "@/app/api";
import LaunchImage from "./_components/LaunchImage";

interface PageProps {
  params: { slug: string };
}
export default function Page({ params: { slug } }: PageProps): ReactElement {
  const [data, setData] = useState<Launch | undefined>();
  const { throwError, errorComponent } = useError();
  useEffect(() => {
    getLaunch(slug).then(setData).catch(throwError);
  }, [slug, throwError]);
  if (errorComponent) return errorComponent;
  if (data === undefined) return <Loading />;
  const {
    name,
    details,
    success,
    date_utc,
    links: {
      patch: { large },
    },
  } = data;
  return (
    <div className="flex flex-col justify-center">
      <nav className="p-4">
        <Link className="underline" href={`/`}>
          Launches
        </Link>{" "}
        / <span className="rounded-sm bg-gray-700">{name}</span>
      </nav>
      <h2 className="text-center">{name}</h2>
      <div className="flex items-center self-center ">
        <div className="flex items-center mx-2">
          <h4>Success</h4>
          <div
            className={clsx("rounded-full w-3 h-3 ml-1", {
              "bg-green-700": success,
              "bg-red-700": !success,
            })}
          />
        </div>
        <div className="flex items-center mx-2">
          <h4>Launch:</h4>
          <h6 className="ml-1">{utcToLocaleTime(date_utc)}</h6>
        </div>
      </div>
      <LaunchImage imgUrl={large} name={name} />
      <p className="text-center p-4">{details}</p>
    </div>
  );
}