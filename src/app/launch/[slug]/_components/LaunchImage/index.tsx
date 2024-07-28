import { ReactElement } from "react";

interface LaunchImageProps {
  imgUrl: string;
  name: string;
}
export default function LaunchImage({
  imgUrl,
  name,
}: LaunchImageProps): ReactElement {
  return (
    <>
      <img
        className="self-center rounded-sm border-2 border-gray-700 my-10"
        width={300}
        height={300}
        alt={name}
        src={imgUrl}
      />
    </>
  );
}
