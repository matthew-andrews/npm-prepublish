"use strict";

module.exports = NoSemverTagError;

function NoSemverTagError(message) {
	this.message = (message || "");
}

NoSemverTagError.prototype = Error.prototype;
