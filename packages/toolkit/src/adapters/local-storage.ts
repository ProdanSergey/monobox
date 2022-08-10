import {
  Storage,
  StorageEventHandler,
  StorageChangeEventDetail,
  StorageRemoveEventDetail,
  StorageEventDetail,
  StorageEventDetailMap,
  StorageError,
} from "../ports";

export class LocalStorage<TValue> implements Storage<TValue> {
  private listeners: Map<
    keyof StorageEventDetailMap<TValue>,
    StorageEventHandler<TValue, keyof StorageEventDetailMap<TValue>>[]
  > = new Map();

  constructor(public key: string) {
    this.throwWhenNotSupported();
    this.listen();
  }

  get(): TValue {
    const item = localStorage.getItem(this.key);

    if (item === null) {
      this.throwNotFound();
    }

    try {
      return JSON.parse(item).value as TValue;
    } catch {
      this.throwNotSerializable();
    }
  }

  set(value: TValue): void {
    try {
      const serializedValue = JSON.stringify({
        value,
      });

      localStorage.setItem(this.key, serializedValue);
      const detail = this.composeChangeDetail(value);
      this.dispatch("change", detail);
    } catch {
      this.throwNotSerializable();
    }
  }

  remove(): void {
    const item = localStorage.getItem(this.key);

    if (item === null) {
      this.throwNotFound();
    }

    localStorage.removeItem(this.key);
    const detail = this.composeRemoveDetail();
    this.dispatch("remove", detail);
  }

  subscribe<T extends keyof StorageEventDetailMap<TValue>>(type: T, listener: StorageEventHandler<TValue, T>): void {
    const listeners = this.listeners.get(type);

    if (!listeners?.length) {
      this.listeners.set(type, [listener as StorageEventHandler<TValue, keyof StorageEventDetailMap<TValue>>]);
      return;
    }

    this.listeners.set(type, [
      ...listeners,
      listener as StorageEventHandler<TValue, keyof StorageEventDetailMap<TValue>>,
    ]);
  }

  unsubscribe<T extends keyof StorageEventDetailMap<TValue>>(type: T, listener: StorageEventHandler<TValue, T>): void {
    const listeners = this.listeners.get(type);

    if (!listeners?.length) {
      return;
    }

    this.listeners.set(
      type,
      listeners.filter((subscription) => subscription !== listener)
    );
  }

  private composeChangeDetail(value: TValue): StorageChangeEventDetail<TValue> {
    return {
      name: "change",
      key: this.key,
      value,
    };
  }

  private composeRemoveDetail(): StorageRemoveEventDetail {
    return {
      name: "remove",
      key: this.key,
    };
  }

  private dispatch<T extends keyof StorageEventDetailMap<TValue>>(
    type: T,
    detail: StorageEventDetail<TValue, T>
  ): void {
    const event = new CustomEvent(`localstorage:${type}`, { detail });

    window.dispatchEvent(event);
  }

  private listen() {
    const types: Array<keyof StorageEventDetailMap<TValue>> = ["change", "remove"];

    types.forEach((type) => {
      window.addEventListener(
        `localstorage:${type}`,
        (({ detail }: CustomEvent<StorageEventDetailMap<TValue>[typeof type]>) => {
          if (this.key !== detail.key) {
            return;
          }

          const listeners = this.listeners.get(type);

          if (!listeners?.length) {
            return;
          }

          listeners.forEach((listener) => {
            listener(detail);
          });
        }) as EventListener,
        false
      );
    });
  }

  private throwWhenNotSupported() {
    if (!this.isSupported()) throw new StorageError("Not supported on your environment");
  }

  private throwNotFound(): never {
    throw new StorageError("Key could not be found");
  }

  private throwNotSerializable(): never {
    throw new StorageError("Value could not be serialized");
  }

  private isSupported(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }
}
