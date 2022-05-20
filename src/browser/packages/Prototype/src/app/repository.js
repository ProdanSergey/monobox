const _private = new WeakMap();

export const Repository = function Repository(name) {
  this.name = name;

  _private.set(this, {
    entries: [],
  });
};

Repository.prototype = {
  constructor: Repository,

  add(entry) {
    return _private.get(this).entries.push(entry);
  },
  delete(index) {
    const [deleted] = _private.get(this).entries.splice(index, 1);

    return deleted;
  },
  replace(index, entry) {
    const [replaced] = _private.get(this).entries.splice(index, 1, entry);

    return replaced;
  },
  has(predicate) {
    return _private.get(this).entries.some(predicate);
  },
  find(predicate) {
    return _private.get(this).entries.find(predicate);
  },
  findIndex(predicate) {
    return _private.get(this).entries.findIndex(predicate);
  },
  findAndReplace(predicate, entry) {
    const index = this.findIndex(predicate);

    if (index >= 0) {
      this.replace(index, entry);
    }
  },
  filter(predicate) {
    return _private.get(this).entries.filter(predicate);
  },
  each(callback) {
    _private.get(this).entries.forEach(callback);
  },
  isEmpty() {
    return _private.get(this).entries.length === 0;
  },
  count() {
    return _private.get(this).entries.length;
  },
  take(start, end) {
    return _private.get(this).entries.slice(start, end);
  },
};
