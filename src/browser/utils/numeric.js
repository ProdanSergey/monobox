const isEven = function isEven() {
  return this.n % 2 === 0;
};
const isOdd = function isEven() {
  return !this.isEven();
};

function Numeric(n) {
  this.n = n;
}

Numeric.prototype.isEven = isEven;
Numeric.prototype.isOdd = isOdd;

class DigitalUnit {
  constructor(amount) {
    if (isNaN(amount)) {
      throw new TypeError("Amount must be a number");
    }
    this.amount = Number(amount.toFixed(2));
  }
}

class MEGABYTE extends DigitalUnit {
  static exp = 1e-6;

  toBytes() {
    return new BYTE(this.amount / MEGABYTE.exp);
  }

  toKilobytes() {
    return this.toBytes().toKilobytes();
  }

  toString() {
    return this.amount + "Mb";
  }
}

class KILOBYTE extends DigitalUnit {
  static exp = 0.001;

  toBytes() {
    return new BYTE(this.amount / KILOBYTE.exp);
  }

  toMegabytes() {
    return this.toBytes().toMegabytes();
  }

  toString() {
    return this.amount + "Kb";
  }
}

class BYTE extends DigitalUnit {
  static exp = 1;

  toKilobytes() {
    return new KILOBYTE(this.amount * KILOBYTE.exp);
  }

  toMegabytes() {
    return new MEGABYTE(this.amount * MEGABYTE.exp);
  }

  toString() {
    return this.amount + "B";
  }
}

export { Numeric, BYTE, KILOBYTE, MEGABYTE };
