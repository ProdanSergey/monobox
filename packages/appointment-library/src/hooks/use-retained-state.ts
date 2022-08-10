import { useEffect, useMemo, useState } from "react";

import { LocalStorage, StorageEventDetailMap, StorageEventHandler } from "@monobox/toolkit";

export type useRetainedStateResult<TValue> = {
  value: TValue | null;
  set: (value: TValue) => void;
  remove: () => void;
};

export const useRetainedState = <TValue>(key: string, initialValue: TValue): useRetainedStateResult<TValue> => {
  const ls = useMemo(() => {
    return new LocalStorage<TValue>(key);
  }, [key]);

  const [value, setValue] = useState<TValue | null>(() => {
    const retainedValue = ls.get();

    if (retainedValue === null && initialValue !== void 0) {
      ls.set(initialValue);
      return initialValue;
    }

    if (retainedValue === null) {
      return null;
    }

    return retainedValue;
  });

  useEffect(() => {
    const handler: StorageEventHandler<TValue, keyof StorageEventDetailMap<TValue>> = (detail) => {
      const { name } = detail;

      switch (name) {
        case "remove":
          setValue(null);
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
