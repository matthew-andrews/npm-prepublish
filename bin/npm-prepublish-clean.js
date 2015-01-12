#!/usr/bin/env node
"use strict";

var logger = module.exports = require('winston');
require('es6-promise').polyfill();
var denodeify = require('denodeify');
var jsonFile = require('jsonfile');
var jsonFileRead = denodeify(jsonFile.readFile);
var jsonFileWrite = denodeify(jsonFile.writeFile);

var argv = require('minimist')(process.argv.slice(2));

jsonFileRead(process.cwd() + '/package.json')
	.then(function(object) {
		object.version = '0.0.0';
		jsonFileWrite(process.cwd() + '/package.json', object);
	})
	.catch(function(err) {
		logger.error(err.toString());
		process.exit(1);
	});
