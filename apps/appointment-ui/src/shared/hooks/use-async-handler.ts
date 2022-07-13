import { useState } from "react";

type THandler<TData, TParams> = {
  (params: TParams): Promise<TData>;
};

export type UseAsyncHandlerResult<TData, TError, TParams> = {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
  asyncHandler: (params: TParams) => Promise<{
    data: TData | null;
    error: TError | null;
  }>;
};

export const useAsyncHandler = <TData = unknown, TError = unknown, TParams = unknown>(
  handler: THandler<TData, TParams>
) => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const asyncHandler = async (params: TParams) => {
    setLoading(true);

    try {
      const data = await handler(params);
      setData(data);

      return {
        data,
        error: null,
      };
    } catch (error) {
      setError(error as TError);

      return {
        data: null,
        error: error as TError,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    asyncHandler,
  };
};
