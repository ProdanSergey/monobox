import { useEffect, useMemo, useState } from "react";

import { LocalStorage, LocalStorageEventHandler, LocalStorageEventType } from "@monobox/infra";

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
    const handler: LocalStorageEventHandler<TValue> = ({ type, detail }) => {
      switch (type) {
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

    const types: LocalStorageEventType[] = ["set", "remove"];

    types.forEach((type) => ls.subscribe(type, handler));

    return () => {
      types.forEach((type) => ls.unsubscribe(type));
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
