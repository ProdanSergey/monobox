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
  private listeners: Map<keyof StorageEventDetailMap<TValue>, Set<StorageEventHandler<TValue>>> = new Map();

  constructor(public key: string) {
    this.throwWhenNotSupported();
    this.listen();
  }

  get(): TValue | undefined {
    const item = localStorage.getItem(this.key);

    if (item === null) {
      return undefined;
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
      this.dispatch("change", this.composeChangeDetail(value));
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
    this.dispatch("remove", this.composeRemoveDetail());
  }

  subscribe<T extends keyof StorageEventDetailMap<TValue>>(type: T, listener: StorageEventHandler<TValue, T>): void {
    let listeners = this.listeners.get(type);

    if (!listeners) {
      this.listeners.set(type, (listeners = new Set()));
    }

    listeners.add(listener as StorageEventHandler<TValue>);
  }

  unsubscribe<T extends keyof StorageEventDetailMap<TValue>>(type: T, listener: StorageEventHandler<TValue, T>): void {
    const listeners = this.listeners.get(type);

    listeners?.delete(listener as StorageEventHandler<TValue>);
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

          listeners?.forEach((listener) => {
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
