import { useEffect, useState } from "react";

type UseDataRequest<TData> = {
  (): Promise<TData>;
};

type UseDataResult<TData, TError> = {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
};

export const useData = <TData = unknown, TError = unknown>(
  request: UseDataRequest<TData>
): UseDataResult<TData, TError> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const pull = async () => {
      setLoading(true);

      try {
        const data = await request();

        setData(data);
      } catch (error) {
        setError(error as TError);
      } finally {
        setLoading(false);
      }
    };

    pull();
  }, [request]);

  return {
    data,
    error,
    isLoading,
  };
};
