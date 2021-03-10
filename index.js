'use strict';

const traverse = require('traverse');

/**
 * Options when initializing full-redact.
 * @param {string=} censor
 *	Optional. The string used when censoring values.
 * @param {Array<string>} secrets
 * 	The array of strings representing the secrets to redact.
 */
module.exports = function ({ censor = '[REDACTED]', secrets }) {
	return {
		map: map,
		forEach: forEach,
	};

	/**
	 * Returns a copy of the object redacted.
	 * @param {object} obj
	 *  The object to map over.
	 * @return {object} The copy of the modified object.
	 */
	function map(obj) {
		return traverse(obj).map(function (_) {
			if (secrets.includes(this.key)) this.update(censor);
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
