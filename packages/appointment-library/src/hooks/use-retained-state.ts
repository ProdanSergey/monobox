import { useEffect, useMemo, useState } from "react";

import { LocalStorage, StorageEventDetailMap, StorageEventHandler } from "@monobox/toolkit";

export type useRetainedStateResult<TValue> = {
  value: TValue | undefined;
  set: (value: TValue) => void;
  remove: () => void;
};

export const useRetainedState = <TValue>(key: string, initialValue: TValue): useRetainedStateResult<TValue> => {
  const ls = useMemo(() => {
    return new LocalStorage<TValue>(key, initialValue);
  }, [key, initialValue]);

  const [value, setValue] = useState<TValue | undefined>(() => ls.get());

  useEffect(() => {
    const handler: StorageEventHandler<TValue, keyof StorageEventDetailMap<TValue>> = (detail) => {
      const { name } = detail;

      switch (name) {
        case "remove":
          setValue(undefined);
          break;
        default: {
          const { value } = detail;

          setValue(value);
          break;
        }
      }
    };

    const types: Array<keyof StorageEventDetailMap<TValue>> = ["change", "remove"];

    types.forEach((type) => ls.subscribe(type, handler));

    return () => {
      types.forEach((type) => ls.unsubscribe(type, handler));
    };
  }, [ls]);

  const set = (value: TValue) => {
    ls.set(value);
  };

  const remove = () => {
    ls.remove();
  };

  return {
    value,
    set,
    remove,
  };
};
