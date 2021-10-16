import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const activeHttpRequest = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (url: string, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);

        return responseData;
      } catch (err) {
        const { message } = err as Error;
        setError(message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError("");
  };

  useEffect(() => {
    activeHttpRequest.current.forEach((abortCtlr) => abortCtlr.abort());
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
