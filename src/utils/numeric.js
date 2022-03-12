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

export { Numeric };
