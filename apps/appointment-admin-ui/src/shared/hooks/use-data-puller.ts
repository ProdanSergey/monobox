import { useEffect, useState } from "react";

type UseDataPullerRequest<TData> = {
  (): Promise<{
    data: TData;
    completed?: boolean;
    timeout?: number;
  }>;
};

type UseDataPullerResult<TData, TError> = {
  data: TData | null;
  error: TError | null;
};

export const useDataPuller = <TData = unknown, TError = unknown>(
  request: UseDataPullerRequest<TData>
): UseDataPullerResult<TData, TError> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const pull = async () => {
      try {
        const { data, completed = false, timeout = 15 * 1000 } = await request();

        setData(data);

        if (!completed) {
          timer = setTimeout(pull, timeout);
        }
      } catch (error) {
        setError(error as TError);
      }
    };

    pull();

    return () => {
      clearTimeout(timer);
    };
  }, [request]);

  return {
    data,
    error,
  };
};
