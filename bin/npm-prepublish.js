#!/usr/bin/env node
"use strict";

var logger = module.exports = require('winston');
require('es6-promise').polyfill();
var denodeify = require('denodeify');
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });

var argv = require('minimist')(process.argv.slice(2));

logger.setLevel = function(newLevel) {
	logger.remove(logger.transports.Console);
	logger.add(logger.transports.Console, { level: newLevel, colorize:true });
	logger.verbose(newLevel + " logging enabled");
};

if (argv.verbose) {
	logger.setLevel('info');
} else {
	logger.setLevel('warn');
}

// adding `version` to `package.json` is quite unnecessary
var packageJsonVersion = require(process.cwd() + '/package.json').version;
if (packageJsonVersion) {
	if (argv.lax) {
		logger.info("Adding `version` to `package.json` is quite unnecessary");
	} else {
		logger.error("Please remove `version` from `package.json` or run `npm-prepublish` with `--lax` option");
		process.exit(1);
	}
}


// ascertain which version of the package should be published, bail if tag not semvery

// put that version in the `package.json` file

// add a warning at the end to remove the version from `package.json` so that it doesn't accidentally get committed
