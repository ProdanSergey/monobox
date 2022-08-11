export class StorageError extends Error {
  name = "StorageError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, StorageError.prototype);
  }
}

export interface StorageGenericEventDetail {
  key: string;
}

export interface StorageChangeEventDetail<TValue> extends StorageGenericEventDetail {
  name: "change";
  value: TValue;
}

export interface StorageRemoveEventDetail extends StorageGenericEventDetail {
  name: "remove";
}

export type StorageEventDetailMap<TValue> = {
  change: StorageChangeEventDetail<TValue>;
  remove: StorageRemoveEventDetail;
};

export type StorageEventDetail<
  TValue,
  T extends keyof StorageEventDetailMap<TValue> = keyof StorageEventDetailMap<TValue>
> = StorageEventDetailMap<TValue>[T];

export type StorageEventHandler<
  TValue,
  T extends keyof StorageEventDetailMap<TValue> = keyof StorageEventDetailMap<TValue>
> = (detail: StorageEventDetailMap<TValue>[T]) => void;

export interface Storage<TValue> {
  key: string;
  get(): TValue | undefined;
  set(value: TValue): void;
  remove(): void;
  subscribe<T extends keyof StorageEventDetailMap<TValue>>(type: T, listener: StorageEventHandler<TValue, T>): void;
  unsubscribe<T extends keyof StorageEventDetailMap<TValue>>(type: T, listener: StorageEventHandler<TValue, T>): void;
}
