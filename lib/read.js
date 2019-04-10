'use strict';

const fs = require('fs');

const { promisify } = require('util');
const readFile = promisify(fs.readFile);

/**
 * @function
 * @name read
 * @param file {path} The path to a file on the filesystem
 **/
const read = file => readFile(file);

module.exports = read;
