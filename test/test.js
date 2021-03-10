const assert = require('assert');
const fullRedact = require('../index');

describe('Redaction', function () {
	let testObject;

	beforeEach(function () {
		testObject = {
			a: 'a',
			b: {
				a: 'a',
				b: 'b',
			},
			c: {
				d: 'd',
			},
			d: 'd',
			e: {
				a: { a: 'a', b: 'b' },
			},
		};
	});

	it('should redact all occurrences inside of an object', function () {
		const censor = 'REDACTED';
		let redact = fullRedact({ censor: censor, secrets: ['a'] });
		let newTestObject = redact(testObject);
		assert.strictEqual(newTestObject.a, censor);
		assert.strictEqual(newTestObject.b.a, censor);
		assert.notStrictEqual(newTestObject.d, censor);
	});

	it('should redact in place', function () {
		const censor = 'REDACTED';
		let redact = fullRedact({ censor: censor, secrets: ['a'], inPlace: true });
		redact(testObject);
		assert.strictEqual(testObject.a, censor);
		assert.strictEqual(testObject.b.a, censor);
	});

	it("should default censor to ['REDACTED']", function () {
		let redact = fullRedact({ secrets: ['a'] });
		newTestObject = redact(testObject);
		assert.strictEqual(newTestObject.a, '[REDACTED]');
		assert.strictEqual(newTestObject.b.a, '[REDACTED]');
	});

	it('should redact an object', function () {
		let redact = fullRedact({ secrets: ['a'] });
		newTestObject = redact(testObject);
		assert.strictEqual(newTestObject.e.a, '[REDACTED]');
	});

	it('should fail gracefully when secrets are not provided', function () {
		try {
			fullRedact({});
		} catch (err) {
			assert.strictEqual(
				err.message,
				"full-redact - Please provide secrets when initializing. Example: ['password', 'authorization', 'apiKey']"
			);
		}
	});
});
