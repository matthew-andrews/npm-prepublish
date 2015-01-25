#!/usr/bin/env node
"use strict";

var logger = module.exports = require('winston');
require('es6-promise').polyfill();
var denodeify = require('denodeify');
var exec = denodeify(require('child_process').exec, function(err, stdout, stderr) { return [err, stdout]; });
var semversionizerComparison = require('semversionizer-comparison');
var semversionizerParser = require('semversionizer-parser');
var jsonFile = require('jsonfile');
var jsonFileRead = denodeify(jsonFile.readFile);
var jsonFileWrite = denodeify(jsonFile.writeFile);
var NoSemverTagError = require('../lib/no-semver-tag-error');

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
if (packageJsonVersion && packageJsonVersion !== '0.0.0') {
	if (argv.lax) {
		logger.info("Adding `version` to `package.json` is quite unnecessary");
	} else {
		logger.error("Please remove `version` from `package.json` or run `npm-prepublish` with `--lax` option");
		process.exit(1);
	}
}


// ascertain which version of the package should be published, bail if tag not semvery
exec('git tag -l --points-at HEAD')
	.then(function(tags) {
		tags = tags.trim().split("\n");
		logger.info("Current commit has tags: " + tags.join(', '));

		// Remove any tags that aren't semver tags
		tags = tags.filter(semversionizerParser);
		if (tags.length === 0) throw new NoSemverTagError("No semver tag found against current commit");
		tags = tags.sort(semversionizerComparison);
		return tags[tags.length - 1];
	})

	// put that version in the `package.json` file
	.then(function(version) {
		logger.info("Current version: " + version);
		return jsonFileRead(process.cwd() + '/package.json')
			.then(function(object) {
				object.version = version;
				jsonFileWrite(process.cwd() + '/package.json', object);
			});
	})


	// add a warning at the end to remove the version from `package.json` so that it doesn't accidentally get committed
	.then(function() {
		logger.warn("`npm prepublish` has added a `version` parameter into `package.json`.  Be careful not to commit it");
	})


	.catch(function(err) {
		if (err instanceof NoSemverTagError) {
			logger.info(err.toString());
		} else {
			logger.error(err.toString());
			process.exit(1);
		}
	});
