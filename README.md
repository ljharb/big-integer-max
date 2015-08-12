#big-integer-max <sup>[![Version Badge][npm-version-svg]][npm-url]</sup>

[![npm badge][npm-badge-png]][npm-url]

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]

[![browser support][testling-png]][testling-url]

Given two valid integers in string form, return the larger of the two.

## Example

```js
var bigIntegerMax = require('big-integer-max');
var reallyBigInteger = '179769313486231570814527423731704356798070567525844996598917476803157260780028538760589558632766878171540458953514382464234321326889464182768467546703537516986049910576551282076245490090389328944075868508455133942304583236903222948165808559332123348274797826204144723168738177180919299881250404026184124858368';
var reallySmallInteger = '-' + reallyBigInteger;

// sync
assert.equal(bigIntegerMax('1', '2'), '2');
assert.equal(bigIntegerMax('-1', '2'), '2');
assert.equal(bigIntegerMax('1', reallyBigInteger), reallyBigInteger);
assert.equal(bigIntegerMax('-1', reallySmallInteger), '-1');

// async
bigIntegerMax('1', '2', function (error, max) {
	assert.equal(error, null); // this should never have an error
	assert.equal(max, '2');
});
```

## Tests
Simply run `npm test` in the repo.

[npm-url]: https://npmjs.org/package/big-integer-max
[npm-version-svg]: http://versionbadg.es/ljharb/big-integer-max.svg
[travis-svg]: https://travis-ci.org/ljharb/big-integer-max.svg
[travis-url]: https://travis-ci.org/ljharb/big-integer-max
[deps-svg]: https://david-dm.org/ljharb/big-integer-max.svg
[deps-url]: https://david-dm.org/ljharb/big-integer-max
[dev-deps-svg]: https://david-dm.org/ljharb/big-integer-max/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/big-integer-max#info=devDependencies
[testling-png]: https://ci.testling.com/ljharb/big-integer-max.png
[testling-url]: https://ci.testling.com/ljharb/big-integer-max
[npm-badge-png]: https://nodei.co/npm/big-integer-max.png?downloads=true&stars=true

