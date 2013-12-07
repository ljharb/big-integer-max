/*globals setImmediate */

var nextTick = (function (undef) {
	var p = typeof process === 'undefined' ? process : {};
	var setI = typeof setImmediate !== 'undefined' ? setImmediate : undef;
	return p.nextTick || setI || function setTimeoutZero(cb) { return setTimeout(cb, 0); };
}());

var toString = Object.prototype.toString;

var isFunction = function (value) {
	var isAlert = typeof window !== 'undefined' && value === window.alert;
	return isAlert || '[object Function]' === toString.call(value);
};

/* Big Integer Maximum
 *
 * Pass in two strings that are otherwise valid integers, positive or negative.
 * No leading zeroes.
 */

var digits = /^\-?[0-9]+$/;
var leadingZeroes = /^\-?0+[^0]+$/;

var bigIntegerMax = function bigIntegerMaximum(numberA, numberB) {
	var aNegative = numberA.charAt(0) === '-';
	var bNegative = numberB.charAt(0) === '-';
	var bothNegative = aNegative && bNegative;
	var largest = numberA;

	if (numberA !== numberB) {
		var lengthA = numberA.length;
		var lengthB = numberB.length;
		if (bothNegative) {
			if (lengthB < lengthA) {
				// negative number with the least digits is largest
				largest = numberB;
			} else if (lengthA === lengthB) {
				// lengths are the same; both negative
				largest = numberA < numberB ? numberA : numberB;
			}
		} else if (aNegative || bNegative) {
			// signs are different
			if (aNegative) {
				largest = numberB;
			}
		} else {
			// both positive
			if (lengthA < lengthB) {
				// positive number with the most digits is largest
				largest = numberB;
			} else if (lengthA === lengthB) {
				// lengths are the same; both positive
				largest = numberA > numberB ? numberA : numberB;
			}

		}
	}

	return largest;
};

var bigIntegerMaxDispatcher = function (numberA, numberB, callback) {
	if (typeof numberA !== 'string' || typeof numberB !== 'string') {
		throw new TypeError('both arguments must be strings');
	} else if (!digits.test(numberA) || !digits.test(numberB)) {
		throw new TypeError('both strings must be valid positive, negative, or zero integers');
	} else if (leadingZeroes.test(numberA) || leadingZeroes.test(numberB)) {
		throw new TypeError('both strings must have no leading zeroes');
	}

	if (isFunction(callback)) {
		nextTick(function () {
			callback(null, bigIntegerMax(numberA, numberB));
		});
	} else {
		return bigIntegerMax(numberA, numberB);
	}
};
bigIntegerMaxDispatcher.method = bigIntegerMax;

module.exports = bigIntegerMaxDispatcher;

