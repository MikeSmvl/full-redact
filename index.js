'use strict';

const traverse = require('traverse');

/**
 * Options when initializing full-redact.
 * @param {string=} censor
 *	Optional. The string used when censoring values.
 * @param {Array<string>} secrets
 * 	The array of strings representing the secrets to redact.
 * @param {boolean=} inPlace
 *  Optional. Will update the object in place when set to true.
 */
module.exports = function ({
	censor = '[REDACTED]',
	secrets,
	inPlace = false,
}) {
	if (!secrets || !secrets.length) {
		throw Error(
			"full-redact - Please provide secrets when initializing. Example: ['password', 'authorization', 'apiKey']"
		);
	}
	return inPlace ? forEach : map;

	/**
	 * Returns a copy of the object redacted.
	 * @param {object} obj
	 *  The object to map over.
	 * @return {object} The copy of the modified object.
	 */
	function map(obj) {
		return traverse(obj).map(function (_) {
			if (secrets && secrets.length && secrets.includes(this.key))
				this.update(censor);
		});
	}

	/**
	 * Redacts an object in-place.
	 * @param {object} obj
	 *  The object to loop over.
	 */
	function forEach(obj) {
		traverse(obj).forEach(function (_) {
			if (secrets.includes(this.key)) this.update(censor);
		});
	}
};
