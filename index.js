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
	var bothNegative = false;
	var largest = numberA;
	if (numberA.charAt(0) === '-' && numberB.charAt(0) === '-') {
		numberA = numberA.slice(1);
		numberB = numberB.slice(1);
		bothNegative = true;
	}
	if (numberA !== numberB) {
		var lengthA = numberA.length;
		var lengthB = numberB.length;
		if (numberA.charAt(0) === '-' || numberB.charAt(0) === '-') {
			// signs are different
			if (numberA.charAt(0) === '-') {
				largest = numberB;
			}
		} else if (bothNegative && lengthB < lengthA) {
			// negative number with the least digits is largest
			largest = numberB;
		} else if (!bothNegative && lengthB > lengthA) {
			// positive number with the most digits is largest
			largest = numberB;
		} else if (bothNegative) {
			// lengths are the same; both negative
			largest = numberA < numberB ? numberA : numberB;
		} else {
			// lengths are the same; both positive
			largest = numberA < numberB ? numberB : numberA;
		}
		if (bothNegative) {
			largest = '-' + largest;
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

