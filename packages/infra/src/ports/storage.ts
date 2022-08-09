export type StorageEventType = "set" | "remove";

export type StorageEventDetail<TValue> = {
  key: string;
  value: TValue;
};

export type StorageEvent<TValue> = {
  type: StorageEventType;
  detail: StorageEventDetail<TValue>;
};

export type StorageEventHandler<TValue> = (event: StorageEvent<TValue>) => void;

export interface Storage<TValue> {
  key: string;
  get(): TValue;
  set(value: TValue): void;
  remove(): void;
  subscribe(type: StorageEventType, handler: StorageEventHandler<TValue>): void;
  unsubscribe(type: StorageEventType): void;
}
