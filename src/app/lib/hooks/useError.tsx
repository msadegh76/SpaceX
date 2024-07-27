import { ReactElement, useCallback, useState } from "react";
import Error from "@/app/Error";

export default function useError(): {
  throwError: () => void;
  errorComponent?: ReactElement;
} {
  const [error, setError] = useState(false);
  const throwError = useCallback(() => setError(true), []);
  return { throwError, errorComponent: error ? <Error /> : undefined };
}
