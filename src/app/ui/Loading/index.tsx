import { ReactElement } from "react";
import LoadingIcon from "../../../../public/spinner.svg";
export default function Loading(): ReactElement {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <LoadingIcon />
    </div>
  );
}
