const LEVELS = {
  WARNING: "WARNING",
  ERROR: "ERROR",
  INFO: "INFO",
};

class Entry {
  constructor(level, target, message, timestamp = new Date()) {
    this.level = level;
    this.target = target;
    this.message = message;
    this.timestamp = timestamp;
  }
}

class EventEntry extends Entry {
  constructor(level, target, event) {
    super(level, target, event.message, event.timestamp);
  }
}

export const Storage = (() => {
  const storage = new WeakMap();

  const setState = (key, value) => {
    storage.set(key, value);
  };
  const getState = (key) => {
    return storage.get(key);
  };

  class Storage {
    constructor() {
      setState(this, []);
    }

    add(item) {
      getState(this).push(item);
    }

    read() {
      return getState(this);
    }
  }

  return Storage;
})();

export class Journal {
  constructor(target, level = LEVELS.WARNING, storage = new Storage()) {
    this.target = target;
    this.level = level;
    this.storage = storage;
  }

  for(target) {
    return new Journal(target, this.level, this.storage);
  }

  info() {
    return new Journal(this.target, LEVELS.INFO, this.storage);
  }

  warn() {
    return new Journal(this.target, LEVELS.WARNING, this.storage);
  }

  error() {
    return new Journal(this.target, LEVELS.ERROR, this.storage);
  }

  report(event) {
    this.storage.add(new EventEntry(this.level, this.target, event));
  }

  message(message) {
    this.storage.add(new Entry(this.level, this.target, message));
  }

  read() {
    return this.storage.read();
  }
}
