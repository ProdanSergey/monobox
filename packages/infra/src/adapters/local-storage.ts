import { Storage, StorageEventDetail, StorageEventHandler, StorageEventType } from "../ports";

export class LocalStorageError extends Error {
  name = "LocalStorageError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LocalStorageError.prototype);
  }
}

export type LocalStorageEventType = StorageEventType;
export type LocalStorageEventHandler<TValue> = StorageEventHandler<TValue>;

export type LocalStorageSubscribeHandler<TValue> = (event: CustomEvent<StorageEventDetail<TValue>>) => void;

export class LocalStorage<TValue> implements Storage<TValue> {
  private subs: Map<StorageEventType, LocalStorageSubscribeHandler<TValue>[]> = new Map();

  constructor(public key: string) {
    this.throwWhenNotSupported();
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

      this.dispatch("set", value);
    } catch {
      this.throwNotSerializable();
    }
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }

  subscribe(type: LocalStorageEventType, handler: LocalStorageEventHandler<TValue>): void {
    const eventListener: LocalStorageSubscribeHandler<TValue> = ({ detail }) => {
      if (this.key !== detail.key) {
        return;
      }

      handler({
        type,
        detail,
      });
    };

    window.addEventListener(`localstorage:${type}`, eventListener as EventListener, false);

    const subs = this.subs.get(type) ?? [];

    this.subs.set(type, [...subs, eventListener]);
  }

  unsubscribe(type: LocalStorageEventType): void {
    const eventListeners = this.subs.get(type);

    if (!eventListeners) {
      return;
    }

    for (const eventListener of eventListeners) {
      window.removeEventListener(`localstorage:${type}`, eventListener as EventListener, false);
    }
  }

  private isSupported(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  private dispatch(type: LocalStorageEventType, value: TValue): void {
    const detail: StorageEventDetail<TValue> = {
      key: this.key,
      value,
    };

    const event = new CustomEvent(`localstorage:${type}`, {
      detail,
    });

    window.dispatchEvent(event);
  }

  private throwWhenNotSupported() {
    if (!this.isSupported()) throw new LocalStorageError("Not supported on your environment");
  }

  private throwNotFound(): never {
    throw new LocalStorageError("Key could not be found");
  }

  private throwNotSerializable(): never {
    throw new LocalStorageError("Value could not be serialized");
  }
}
