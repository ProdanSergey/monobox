export const Repository = class Repository {
  constructor(entries = []) {
    this.entries = entries;
  }

  add(entry) {
    return this.entries.push(entry);
  }

  delete(index) {
    const [deleted] = this.entries.splice(index, 1);

    return deleted;
  }

  replace(index, entry) {
    const [replaced] = this.entries.splice(index, 1, entry);

    return replaced;
  }

  has(predicate) {
    return this.entries.some(predicate);
  }

  find(predicate) {
    return this.entries.find(predicate);
  }

  findIndex(predicate) {
    return this.entries.findIndex(predicate);
  }

  findAndReplace(predicate, entry) {
    const index = this.findIndex(predicate);

    if (index >= 0) {
      this.replace(index, entry);
    }
  }

  filter(predicate) {
    return this.entries.filter(predicate);
  }

  each(callback) {
    this.entries.forEach(callback);
  }

  isEmpty() {
    return this.entries.length === 0;
  }

  count() {
    return this.entries.length;
  }

  take(start, end) {
    return this.entries.slice(start, end);
  }
};
