export class User {
  constructor(data = {}) {
    const props = {
      firstName: null,
      lastName: null,
      year: null,
      month: null,
      day: null,
    };

    for (const key of Object.keys(props)) {
      this[key] = data[key] ?? props[key];
    }
  }

  get fullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(" ");
  }

  get age() {
    if ([this.year, this.month, this.day].every(isFinite)) {
      const month = this.month - 1;

      const now = new Date();
      const birth = new Date(this.year, month, this.day);
      const birthDay = new Date(now.getFullYear(), month, this.day);

      const fullAge = now.getFullYear() - birth.getFullYear();

      if (now > birthDay) {
        return fullAge;
      }

      return fullAge - 1;
    }

    return null;
  }
}
