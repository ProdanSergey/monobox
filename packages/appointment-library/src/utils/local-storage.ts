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

export class LocalStorage<TValue> implements Storage<TValue> {
  private subs: Map<StorageEventType, EventListener[]> = new Map();

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

  subscribe(type: StorageEventType, handler: StorageEventHandler<TValue>): void {
    const eventListener = (({ detail }: CustomEvent<StorageEventDetail<TValue>>) => {
      if (this.key !== detail.key) {
        return;
      }

      handler({
        type,
        detail,
      });
    }) as EventListener;

    window.addEventListener(`localstorage:${type}`, eventListener, false);

    const subs = this.subs.get(type) ?? [];

    this.subs.set(type, [...subs, eventListener]);
  }

  unsubscribe(type: StorageEventType): void {
    const eventListeners = this.subs.get(type);

    if (!eventListeners) {
      return;
    }

    for (const eventListener of eventListeners) {
      window.removeEventListener(`localstorage:${type}`, eventListener, false);
    }
  }

  private isSupported(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  private dispatch(type: StorageEventType, value: TValue): void {
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
    if (!this.isSupported()) throw new Error("Local Storage is not supported on your environment");
  }

  private throwNotFound(): never {
    throw new Error("Local Storage is not supported on your environment");
  }

  private throwNotSerializable(): never {
    throw new Error("Local Storage value could not be serialized");
  }
}
