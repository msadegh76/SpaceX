import Image from "next/image";
import { ReactElement, useState } from "react";

interface LaunchImageProps {
  imgUrl: string;
  name: string;
}
export default function LaunchImage({
  imgUrl,
  name,
}: LaunchImageProps): ReactElement {
  const [fallback, setFallback] = useState(false);
  return (
    <>
      {!fallback ? (
        <Image
          className="self-center rounded-sm border-2 border-gray-700 my-10"
          width={300}
          height={300}
          alt={name}
          src={imgUrl}
          onError={() => setFallback(true)}
        />
      ) : (
        <img
          className="self-center rounded-sm border-2 border-gray-700 my-10"
          width={300}
          height={300}
          alt={name}
          src={imgUrl}
        />
      )}
    </>
  );
}
